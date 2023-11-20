
<template lang="pug">
VList(gap="3 md:6")
  div(grid="~ gap-3 md:cols-3 md:gap-6")
    TitleDetail() 
      template(#detail)  {{ $t('index.totalLiquidity') }}
      template(#default) {{ formatNumber(item.totalStakedAmount ?? 0)}}

    TitleDetail(:icon="type == 'matic' ? 'ixtmatic' : 'ixtusdt'") 
      template(#detail) {{ $t('index.yourStake') }}
      template(#default) {{ roundToDecimals(userStakingData?.amountStaked, 10) }}

    TitleDetail()
      template(#detail) {{ $t('index.lpTokens') }}
      template(#default) {{ roundToDecimals(userStakingData?.balanceOfToken, 10) }}

    //- TitleDetail()
    //-   template(#detail) {{ $t('index.apy') }}
    //-   template(#default) {{ getAPY(item) }}

  TitleDetail(v-if="hasStake && !isPastLockTime")
    template(#detail) {{ $t('general.lockPeriodEnds') }}
    template(#default) {{lockPeriodEnds}}

  </template>


<script lang="ts" setup>
import type { StakingDataFragment } from '~/.nuxt/gql/default';



const { item } = defineProps<{
  item: StakingDataFragment,
  type: 'usdt' | 'matic'
}>()

const { getAPY } = useStakingPools()

const userStakingData = computed(() => item.stakingItems && item.stakingItems[0]?.userStakingData)


const stakedAt = computed(() => item.stakingItems?.[0]?.userStakingData?.stakedAt ?? 0)
const lockPeriod = computed(() => item.lockPeriod ?? 0)
const hasStake = computed(() => (userStakingData.value?.amountStaked ?? 0) > 0)

const currentTime = useTimestamp()

const endTime = computed(() =>
  lockPeriod.value + stakedAt.value
)

const isPastLockTime = computed(() => {
  const now = Math.floor(currentTime.value / 1000)
  return now > endTime.value
})

const lockPeriodEnds = computed(() => {
  if (!endTime.value)
    return 0

  const { months, days, hours, minutes, seconds } = useIntervalWithDays(currentTime.value, endTime.value * 1000)
  const optMonth = months && months > 0 ? `${months}Mth` : ''
  return `${optMonth} ${days}D ${hours}H ${minutes}M ${seconds}S`
})


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