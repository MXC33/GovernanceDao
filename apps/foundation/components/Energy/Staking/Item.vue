<template lang="pug">
Card()
  HList(space-x="10")
    TitleDetail() 
      template(#detail) Locking period
      template(#default) 1 Month
    TitleDetail()
      template(#detail) Your Stake
      template(#default) 
        HList(items="center" space-x="1")
          div 0
          IXTIcon(w="5")
    TitleDetail()
      template(#detail) Your Stake
      template(#default) 
        HList(items="center" space-x="1")
          div 0
          img(src="~/assets/png/EnergyIcon.png" w="6")
    TitleDetail()
      template(#detail) Daily rewards
      template(#default) 
        HList(items="center" space-x="1")
          div 0
          IXTIcon(w="5")
  HList(gap-6)
    button(btn="~ primary-outline disabled") Unstake 
    button(btn="~ primary-outline") Stake 
  template(#detailBottom)
    ClaimHorizontal()
</template>
  
  
<script lang="ts" setup>

import { formatNumber } from '@ix/base/composables/Utils/useHelpers';
import IXTIcon from '~/assets/images/token.svg'
import { StakingId } from '~/.nuxt/gql/default';

const { data: IXTOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { data: IXTThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { data: IXTSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { data: IXTTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)


interface BoxData {
  monthValue: number;
  apy: number | null | undefined
  userStake: number | null | undefined
  poolSize: string
  totalLiquidity?: string
  lpTokens?: string
  roi?: string
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
    userStake: IXTSixMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked,
    poolSize: IXTSixMonthData.value?.totalStakedAmount ? formatNumber(IXTSixMonthData.value?.totalStakedAmount) : "0"
  },
  {
    monthValue: 3,
    apy: getAPY(IXTThreeMonthData.value?.stakingItems[0].rewardRate, IXTThreeMonthData.value?.totalStakedAmount),
    userStake: IXTThreeMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked,
    poolSize: IXTThreeMonthData.value?.totalStakedAmount ? formatNumber(IXTThreeMonthData.value?.totalStakedAmount) : "0"
  },
  {
    monthValue: 1,
    apy: getAPY(IXTOneMonthData.value?.stakingItems[0].rewardRate, IXTOneMonthData.value?.totalStakedAmount),
    userStake: IXTOneMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked,
    poolSize: IXTOneMonthData.value?.totalStakedAmount ? formatNumber(IXTOneMonthData.value?.totalStakedAmount) : "0"
  },
])




</script>