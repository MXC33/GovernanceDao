
<template lang="pug">
div(grid="~ cols-3 gap-6")
  TitleDetail() 
    template(#detail)  {{ $t('index.totalLiquidity') }}
    template(#default) {{ roundToDecimals(item.totalStakedAmount, 2) }}

  TitleDetail() 
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
  item: StakingDataFragment
}>()

const userStakingData = computed(() => item.stakingItems && item.stakingItems[0]?.userStakingData)
</script>