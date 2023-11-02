
<template lang="pug">
HList(space-x="10")
  TitleDetail()
    template(#detail) {{ $t('index.apy') }}
    template(#default) {{ poolApy }} %

  TitleDetail(icon="ixt")
    template(#detail) {{ $t('index.yourStake') }}
    template(#default) {{ amountStaked ?? 0}}

  TitleDetail(icon="ixt")
    template(#detail) {{ $t('index.poolSize') }}
    template(#default) {{ poolSize }}

  </template>


<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';
import IXTIcon from '~/assets/images/token.svg'

const { getAPY } = useStakingPools()

const { pool } = defineProps<{
  pool: StakingDataFragment,
}>()

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