<template lang="pug">
div(grid="~ cols-2 gap-3")
  Card(v-for="box in boxes" :key="box.monthValue")
    div
      h3(text-2xl font-bold) {{ box.monthValue }} Months
      p Lock period
    div(grid grid-cols-3)
      div APY
        div {{ box.apy }}
      div Your Stake
        div {{ box.userStake }}
      div Pool Size
        div {{ box.poolSize }}
    VList
      Claim
  </template>
  


<script lang="ts" setup>

import { StakingId } from '../../.nuxt/gql/default';

const { execute: fetchIXTOneMonthData, data: IXTOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { execute: fetchIXTThreeMonthData, data: IXTThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { execute: fetchIXTSixMonthData, data: IXTSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { execute: fetchIXTTwelveMonthData, data: IXTTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)


interface BoxData {
  monthValue: number;
  apy: number | null | undefined
  userStake: number | null | undefined
  poolSize: number | null | undefined
}

const boxes = computed<BoxData[]>(() => [
  {
    monthValue: 12,
    apy: 0,
    userStake: IXTTwelveMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked,
    poolSize: IXTTwelveMonthData.value?.totalStakedAmount
  },
  {
    monthValue: 6,
    apy: 0,
    userStake: IXTSixMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked, poolSize: IXTSixMonthData.value?.totalStakedAmount
  },
  {
    monthValue: 3,
    apy: 0,
    userStake: IXTThreeMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked, poolSize: IXTThreeMonthData.value?.totalStakedAmount
  },
  {
    monthValue: 1,
    apy: 0,
    userStake: IXTOneMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked, poolSize: IXTOneMonthData.value?.totalStakedAmount
  },
])




</script>