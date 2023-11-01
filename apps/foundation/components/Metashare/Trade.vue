<template lang="pug">
VList(space-y="3")
  CardTitle(:large="true") Trade

  HList(space-x="3")
    TitleDetail()
      template(#detail) {{ $t('general.shares') }}
      template(#default) {{stakingItem?.totalStaked}} 

    TitleDetail(icon="ixt")
      template(#detail) {{ $t('metashare.TradeIXTPerShare30Days') }}
      template(#default) {{roundToDecimals(stakingItem?.rewardPerThirtyDays)}} 

  ButtonGlitch(btn="~ primary-outline-cut" @click="onClickNavigate" :text="$t('metashare.TradeViewOnMarketplace')")

</template>
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';


const { stakingItem } = defineProps<{
  stakingItem: StakingItemFragment | undefined
}>()

const onClickNavigate = () => {
  window.open(`https://marketplace.planetix.com/assets/polygon/0xba6666b118f8303f990f3519df07e160227cce87/${stakingItem?.token.tokenId}`)
}


</script>