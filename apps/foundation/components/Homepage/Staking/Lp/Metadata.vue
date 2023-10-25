
<template lang="pug">
div(grid="~ cols-3 gap-6")
  TitleDetail() 
    template(#detail)  {{ $t('index.totalLiquidity') }}
    template(#default) {{ formatNumber(item.totalStakedAmount ?? 0)}}

  TitleDetail(:icon="type == 'matic' ? 'ixtmatic' : 'ixtusdt'") 
    template(#detail) {{ $t('index.yourStake') }}
    template(#default) {{ roundToDecimals(userStakingData?.amountStaked, 2) }}

  TitleDetail()
    template(#detail) {{ $t('index.fiveDayRoi') }}
    template(#default) 

  TitleDetail()
    template(#detail) {{ $t('index.lpTokens') }}
    template(#default) {{ roundToDecimals(userStakingData?.balanceOfToken, 2) }}

  TitleDetail()
    template(#detail) {{ $t('index.apy') }}
    template(#default) 26%

  </template>


<script lang="ts" setup>
import type { StakingDataFragment } from '~/.nuxt/gql/default';

const { item } = defineProps<{
  item: StakingDataFragment,
  type: 'usdt' | 'matic'
}>()

const userStakingData = computed(() => item.stakingItems && item.stakingItems[0]?.userStakingData)
console.log("USER", item.stakingItems)

function formatNumber(value: number): string {
  // If value is 1 million or greater
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  // If value is 1 thousand or greater
  else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}k`;
  }
  return `$${value}`;
}


</script>