<template lang="pug">
HList(items="center" space-x="1 lg:2" font="bold" :class="['is-' + type]")

  HList(cursor="pointer" font="bold" @mouseenter="mouseEnter" @mouseleave="mouseLeave" gap="2")
    component(:is="iconPath" w="5" h="5")

    HelperIncrementingNumber(v-if="type != 'gas-price'" :value="Number(balance)", :decimals="decimalCount" items="center" :color="resourceTextColor" :text-shadow="resourceTextColor")

    VList(v-else-if="type == 'gas-price'" items="center" align="center" justify="center")
      component(:is="gasPriceIcon" w="3")

    HList(v-if="isHovered == true" opacity="on-active:100 0 on-hover:100" transition="opacity" :hover="isHovered" pos="absolute top-6" bg="gray-800" cursor="default" z="9999")

      Teleport(to="#infobox")
        .info-box(font="bold" text="xs" bg="gray-800" p="2" translate-y="6" :color="resourceTextColor" z="9999" :position="[`absolute top-${y} left-${x}`]" whitespace="nowrap") 
          div {{ detailedText }}
          div {{ balance }}

</template>

<script setup lang="ts">
import type { UserResource } from '~~/composables/useUserData';
import IXTIcon from '~/assets/images/ui/resources/ixt-icon.svg'
import AstroGoldIcon from '~/assets/images/ui/resources/astro-gold-icon.svg'
import AstroGoldLiteIcon from '~/assets/images/ui/resources/astro-gold-lite-icon.svg'
import AstroIcon from '~/assets/images/ui/resources/ac-icon.svg'
import WasteIcon from '~/assets/images/ui/resources/waste-icon.svg'
import EnergyIcon from '~/assets/images/ui/resources/energy-icon.svg'
import PowerIcon from '~/assets/images/ui/resources/power-icon.svg'
import GasPriceLow from '~/assets/images/ui/resources/gasprice-low.svg'
import GasPriceStable from '~/assets/images/ui/resources/gasprice-icon.svg'
import GasPriceHigh from '~/assets/images/ui/resources/gasprice-high.svg'
import LevelIcon from '~/assets/images/ui/resources/mclevel-icon.svg'

const isHovered = ref(false)

const mouseEnter = () => {
  isHovered.value = true
}

const mouseLeave = () => {
  isHovered.value = false
}

const { x, y } = useMouse()

const { totalEnergyProductionPerDay } = useTileMetaData()
const { tileGroups } = useTileData()
const { userResources } = useUserData()
const { data: gasPrice } = useAsyncGasPrice()
const { ixtBalance, astroGoldBalance, astroGoldLiteBalance, astroGoldToken, astroGoldLiteToken } = useCurrencyData()
const { paymentRunoutInFourDays } = useTileRent()


const decimalCount = computed(() => {
  switch (props.type) {
    case 'ixt':
    case 'astro-gold':
    case 'astro-gold-lite':
      return 2
    case 'power':
      return 1
    default:
      return 0
  }
})
const props = defineProps<{
  type: UserResource,
  hideNumber?: boolean
}>()

const resourceTextColor = computed(() => {

  switch (props.type) {
    case 'ixt': return 'mc-orange'
    case 'astro-gold':
      return paymentRunoutInFourDays(astroGoldToken.value) ? 'mc-red' : 'white'
    case 'astro-gold-lite':
      return paymentRunoutInFourDays(astroGoldLiteToken.value) ? 'mc-red' : 'white'
    case 'astro-credit': return 'mc-astro_credit'
    case 'energy': return 'mc-mint'
    case 'power': return 'mc-yellow'
    case 'waste': return 'mc-gws'
    case 'gas-price': return 'mc-white'
    case 'mc-level': return 'mc-white'
  }
})

const gasPriceIcon = computed(() => {
  if (gasPrice.value?.gasPriceIndicator == 'low')
    return GasPriceLow
  else if (gasPrice.value?.gasPriceIndicator == 'high')
    return GasPriceHigh
  else return null
})

const balance = computed(() => {
  const { astroCredits, waste, energy, mcLevel } = userResources.value

  switch (props.type) {
    case 'ixt': return ixtBalance.value
    case 'astro-gold': return astroGoldBalance.value
    case 'astro-gold-lite': return astroGoldLiteBalance.value
    case 'astro-credit': return astroCredits
    case 'waste': return waste
    case 'energy': return energy
    case 'power': return totalEnergyProductionPerDay(tileGroups.value)
    case 'mc-level': return mcLevel.value
    case 'gas-price': return gasPrice.value.gasPriceGwei
  }
})

const iconPath = computed(() => {
  switch (props.type) {
    case 'waste': return WasteIcon
    case 'ixt': return IXTIcon
    case 'astro-gold': return AstroGoldIcon
    case 'astro-gold-lite': return AstroGoldLiteIcon
    case 'astro-credit': return AstroIcon
    case 'power': return PowerIcon
    case 'energy': return EnergyIcon
    case 'gas-price': return GasPriceStable
    case 'mc-level': return LevelIcon
  }
})

const detailedText = computed(() => {
  switch (props.type) {
    case 'ixt': return 'IXT Balance'
    case 'astro-gold': return 'Astro Gold'
    case 'astro-gold-lite': return 'Astro Gold Lite'
    case 'astro-credit': return 'Astro Credits'
    case 'waste': return 'Waste'
    case 'energy': return 'Energy'
    case 'power': return 'Daily Energy Output'
    case 'gas-price': return 'Gas price'
    case 'mc-level': return 'MC Base Level'
  }
})


</script>

<style>
svg.svg-shadow-orange {
  filter: drop-shadow(0px 0px 6px rgba(255, 102, 71, 0.5));
}

svg.svg-shadow-mint {
  filter: drop-shadow(0px 0px 6px rgba(210, 210, 210, 0.5));
}

svg.svg-shadow-yellow {
  filter: drop-shadow(0px 0px 6px rgba(255, 203, 71, 0.5));
}

svg.svg-shadow-blue {
  filter: drop-shadow(0px 0px 6px rgba(255, 203, 71, 0.5));
}
</style>

