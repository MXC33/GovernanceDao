<template lang="pug">
CardSection(title="Trade")
  div {{ $t('general.shares') }}: {{stakingItem?.totalStaked}} 
  div {{ $t('metashare.TradeIXTPerShare30Days') }}: [api data]
  template(#buttons) 
    button(btn="~ primary-outline-cut") VIEW ON MARKETPLACE

</template>
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';


const { stakingItem } = defineProps<{
  stakingItem: StakingItemFragment | undefined
}>()



</script>