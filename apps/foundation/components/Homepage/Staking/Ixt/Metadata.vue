
<template lang="pug">
HList(space-x="10")
  TitleDetail()
    template(#detail) {{ $t('index.apy') }}
    template(#default) {{ poolApy }} %

  TitleDetail()
    template(#detail) {{ $t('index.yourStake') }}
    template(#default)
      HList()
        span {{ amountStaked }}
        IXTIcon(w="5" class="ml-2")

  TitleDetail()
    template(#detail) {{ $t('index.poolSize') }}
    template(#default)
      HList()
        span {{ poolSize }}
        IXTIcon(w="5" class="ml-2")

  </template>


<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';
import IXTIcon from '~/assets/images/token.svg'

const { pool } = defineProps<{
  pool: StakingDataFragment,
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