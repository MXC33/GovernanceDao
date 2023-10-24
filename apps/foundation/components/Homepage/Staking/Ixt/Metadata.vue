
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