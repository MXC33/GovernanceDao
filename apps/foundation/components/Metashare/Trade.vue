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

  ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('metashare.TradeViewOnMarketplace')")

</template>
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';


const { stakingItem } = defineProps<{
  stakingItem: StakingItemFragment | undefined
}>()



</script>