<template lang="pug">
Card()
  div
    div(text-2xl font-bold flex gap-2) {{ month }} 
      PageParagraphs(section="lockPeriodTwelve")
  HList(space-x="10")
    div 
      PageParagraphs(section="apy")
      div(style="display: flex; align-items: center;")
        span {{ poolApy }} %
    div 
      PageParagraphs(section="yourStake")
      div(style="display: flex; align-items: center;")
        span {{ amountStaked }}
        IXTIcon(w="5" class="ml-2")
    div 
      PageParagraphs(section="poolSize")
      div(style="display: flex; align-items: center;")
        span {{ poolSize }}
        IXTIcon(w="5" class="ml-2")

  HList(gap-6)
    button(btn="~ primary-outline")
      PageParagraphs(section="withdrawBtn")
    button(btn="~ primary-outline")
      PageParagraphs(section="depositBtn")

  template(#detailBottom)
    ClaimHorizontal()
  </template>


<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';
import IXTIcon from '~/assets/images/token.svg'

const { pool } = defineProps<{
  pool: StakingDataFragment,
  month: number
}>()

const stakeItem = computed(() => pool.stakingItems && pool.stakingItems[0])

const poolApy = computed(() =>
  getAPY(stakeItem.value?.rewardRate ?? 0, pool.totalStakedAmount ?? 0)
)

const amountStaked = computed(() =>
  stakeItem.value?.userStakingData?.amountStaked
)

const poolSize = computed(() =>
  formatNumber(pool.totalStakedAmount ?? 0)
)

const getAPY = (rewardRate: number, totalSupply: number) => {
  const APR = (rewardRate * 86400 * 365) / totalSupply;
  return roundToDecimals(((1 + APR / 365) ** 365 - 1) * 100, 2)
}





</script>