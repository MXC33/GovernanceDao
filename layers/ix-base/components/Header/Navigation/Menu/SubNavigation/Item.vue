<template lang="pug">
NuxtLink(:to="link" cursor="pointer" @click="onClick")
  HList(group py="3" space-x="3" pos="right-0" text="left")

    //-Display this image/svg when in Landscape mode
    HeaderNavigationMenuSubNavigationIcon(w="8" fill="white group-hover:ix-orange" flex-shrink="0" :item="item.icon" display="lt-lg:none")

    VList()
      VList(v-if="link || isSwap")
        div(color="white group-hover:ix-orange" uppercase ="~") {{ item.name}} 
        div(color="gray-200 group-hover:ix-orange" text="sm" ) {{ item.description}} 
      VList(v-else)
        div(color="gray" uppercase="~") {{ item.name}} 
        div(color="ix-orange" text="sm" ) {{ $t(`general.navigation.soon`)}}
</template>
  
<script lang="ts" setup>
import type { HeaderMenuSubNavigationItem } from '~/composables/useSiteHeader'
const { closeHeaderMenu } = useSiteHeader()

const { enable: enableSwap } = useIXTSwapVisible()

const { item } = defineProps<{
  item: HeaderMenuSubNavigationItem
}>()

const config = useAppConfig()

const isSwap = computed(() =>
  item.modal_type?.toLowerCase() == 'swap'
)

const link = computed(() => {
  const url = item.absolute_url
  const maybeRelativeLink = (() => {
    switch (config.ixApp) {
      case 'mission-control':
        return url.replace('https://missioncontrol.planetix.com', '')
      case 'marketplace':
        return url.replace('https://marketplace.planetix.com', '')
      case 'territory-lottery':
        return url.replace('https://territorylottery.planetix.com', '')
      default:
        return url
    }
  })()
  return maybeRelativeLink
})


const onClick = () => {
  if (isSwap.value)
    enableSwap()

  closeHeaderMenu()
}

</script>