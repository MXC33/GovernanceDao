
<template lang="pug">
HList(space-x="6+")
  TitleDetail()
    template(#detail) {{ $t('index.apy') }}
    template(#default) {{ poolApy }} %

  TitleDetail(icon="ixt")
    template(#detail) {{ $t('index.yourStake') }}
    template(#default) {{ amountStaked ?? 0}}

  TitleDetail(icon="ixt")
    template(#detail) {{ $t('index.poolSize') }}
    template(#default) {{ poolSize }}

  TitleDetail( v-if="stakedAt")
    template(#detail) {{ $t('general.lockPeriodEnds') }}
    template(#default) {{ lockPeriodEnds }}

  </template>


<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';

const { getAPY } = useStakingPools()

const { pool } = defineProps<{
  pool: StakingDataFragment,
}>()

const stakedAt = computed(() => pool.stakingItems?.[0]?.userStakingData?.stakedAt ?? 0)
const lockPeriod = computed(() => pool.lockPeriod ?? 0)
const currentTime = useTimestamp()

const lockPeriodEnds = computed(() => {
  const endTime = lockPeriod.value + stakedAt.value

  if (!endTime)
    return 0

  const { months, days, hours, minutes, seconds } = useIntervalWithDays(currentTime.value, endTime * 1000)
  const optMonth = months && months > 0 ? `${months}M.` : ''
  return `${optMonth} ${days}D ${hours}H ${minutes}M ${seconds}S`
})

const stakeItem = computed(() => pool.stakingItems && pool.stakingItems[0])

const poolApy = computed(() =>
  getAPY(pool)
)

const amountStaked = computed(() =>
  stakeItem.value?.userStakingData?.amountStaked
)

const poolSize = computed(() =>
  formatNumber(pool.totalStakedAmount ?? 0)
)







</script>