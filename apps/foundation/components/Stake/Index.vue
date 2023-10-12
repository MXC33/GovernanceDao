<template lang="pug">
div(grid="~ cols-2 gap-3")
  Card(v-for="box in boxes" :key="box.monthValue")
    div
      h3(text-2xl font-bold) {{ box.monthValue }} Months
      p Lock period
    div(grid grid-cols-3)
      div APY
        div {{ box.apy }} %
      div Your Stake
        div {{ box.userStake ?? 0 }}
      div Pool Size
        div {{ box.poolSize }}
    VList
      Claim
  </template>
  


<script lang="ts" setup>

import { formatNumber } from '@ix/base/composables/Utils/useHelpers';
import { StakingId } from '../../.nuxt/gql/default';

const { execute: fetchIXTOneMonthData, data: IXTOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { execute: fetchIXTThreeMonthData, data: IXTThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { execute: fetchIXTSixMonthData, data: IXTSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { execute: fetchIXTTwelveMonthData, data: IXTTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)


interface BoxData {
  monthValue: number;
  apy: number | null | undefined
  userStake: number | null | undefined
  poolSize: string | null | undefined
}

const getAPY = (rewardRate: number, totalSupply: number) => {
  const APR = (rewardRate * 86400 * 365) / totalSupply;
  return roundToDecimals(((1 + APR / 365) ** 365 - 1) * 100, 2)
}

const boxes = computed<BoxData[]>(() => [
  {
    monthValue: 12,
    apy: getAPY(IXTTwelveMonthData.value?.stakingItems[0].rewardRate, IXTTwelveMonthData.value?.totalStakedAmount),
    userStake: IXTTwelveMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked,
    poolSize: IXTTwelveMonthData.value?.totalStakedAmount ? formatNumber(IXTTwelveMonthData.value?.totalStakedAmount) : "0"
  },
  {
    monthValue: 6,
    apy: getAPY(IXTSixMonthData.value?.stakingItems[0].rewardRate, IXTSixMonthData.value?.totalStakedAmount),
    userStake: IXTSixMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked, poolSize: IXTSixMonthData.value?.totalStakedAmount ? formatNumber(IXTSixMonthData.value?.totalStakedAmount) : "0"
  },
  {
    monthValue: 3,
    apy: getAPY(IXTThreeMonthData.value?.stakingItems[0].rewardRate, IXTThreeMonthData.value?.totalStakedAmount),
    userStake: IXTThreeMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked, poolSize: IXTThreeMonthData.value?.totalStakedAmount ? formatNumber(IXTThreeMonthData.value?.totalStakedAmount) : "0"
  },
  {
    monthValue: 1,
    apy: getAPY(IXTOneMonthData.value?.stakingItems[0].rewardRate, IXTOneMonthData.value?.totalStakedAmount),
    userStake: IXTOneMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked, poolSize: IXTOneMonthData.value?.totalStakedAmount ? formatNumber(IXTOneMonthData.value?.totalStakedAmount) : "0"
  },
])




</script>