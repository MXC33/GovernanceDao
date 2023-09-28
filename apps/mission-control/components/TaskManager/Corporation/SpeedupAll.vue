<template lang="pug">
HList(v-if="hasUncompletedOrders" bg="mc-black opacity-80" pos="sticky top-0" z="50" font="bold" gap="1" )
  ButtonSound( @click="onClickSpeedup(ixtToken)" bg="$mc-mint-40 hover:$mc-mint-60" b="$mc-mint 1" w="full" sound="sm" uppercase="~"  p="2" cut="bottom-right b-$mc-mint")
    VList(justify="center" items="center" space-y="1")
      div() finish all
      HList(space-x="1") 
        span() {{ ixtPrice }}
        IXTIcon(w="5")

  ButtonSound( @click="onClickSpeedup(astroCreditToken)" bg="$mc-mint-40 hover:$mc-mint-60" b="$mc-mint 1" w="full" sound="sm" uppercase="~"  p="2" cut="bottom-right b-$mc-mint")
    VList(justify="center" items="center" space-y="1")
      div() finish all
      HList(space-x="1") 
        span() {{ acPrice }}
        AstroCreditIcon(w="5")

</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'
import AstroCreditIcon from '~/assets/images/ui/token/astro-credit.svg?component'
import IXTIcon from '~/assets/images/ui/token/ixt.svg?component'
import type { Corporation } from '~/composables/corporations/useCorporations';

const { getSpeedupAllInfo, getNotCompletedOrders } = useTaskManager()

const { speedupAllOrders } = useOrderContracts()
const { ixtToken, astroCreditToken } = useCurrencyData()
const eternalabCorpo: Corporation = 'eternalab'

const ixtPrice = getSpeedupAllInfo(eternalabCorpo)?.ixtCost
const acPrice = getSpeedupAllInfo(eternalabCorpo)?.astroCreditCost

const hasUncompletedOrders = computed(() => getNotCompletedOrders('eternalab').length > 0)

const onClickSpeedup = async (token: NftFragment) => {
  const info = getSpeedupAllInfo(eternalabCorpo)
  return await speedupAllOrders({ task: 'craft', type: 'eternalab' }, { token, amount: info.numberOfSpeedups, price: Number(info.ixtCost) })
}


</script>
