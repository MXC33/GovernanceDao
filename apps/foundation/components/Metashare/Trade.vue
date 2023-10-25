<template lang="pug">
CardSection(title="Trade") 
  div {{ $t('general.shares') }}: {{stakingItem?.totalStaked}} 
  div {{ $t('metashare.TradeIXTPerShare30Days') }}: [api data]
  template(#buttons) 
  ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('metashare.TradeViewOnMarketplace')")

</template>
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';


const { stakingItem } = defineProps<{
  stakingItem: StakingItemFragment | undefined
}>()



</script>