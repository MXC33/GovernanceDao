<template lang="pug">
ClientOnly()
  StakingItem(:can-withdraw="stakeBalance > 0 && lockPeriod" :can-deposit="tokenBalance > 0" @deposit="depositActive = true" @withdraw="withdrawActive = true")
    template(#title) {{ $t(`index.lpStaking.${type}.title`) }}
    template(#subtitle) {{ $t(`index.lpStaking.provide`) }}
    template(#icon)
      UsdtIXT_Icon(w="14" v-if="type == 'usdt'")
      MaticIXT_Icon(w="14" v-else)
    template(#metadata)
      HomepageStakingLpMetadata(:item="pool" :type="type" v-if="pool")

    template(#detail)
      StakingRewards(:pool="pool" v-if="pool" @claim="claimReward")

  Teleport(to="#overlays")
    StakingActionLPDeposit(@close="depositActive = false" v-if="depositActive" :month="1" :pool="pool" @stake="onClickStake")

    StakingActionLPWithdraw(@close="withdrawActive = false" v-if="withdrawActive" :pool="pool" @withdraw="onClickUnstake")
</template>

<script lang="ts" setup>
import { type StakingDataFragment } from '~/.nuxt/gql/default';

import UsdtIXT_Icon from '~/assets/images/usdt_ix.svg'
import MaticIXT_Icon from '~/assets/images/matic_ix.svg'
const { getFirstUserStakeInPool, isUnderLockPeriod } = useStakingPools()

const { claimMaticLPIXT, stakeMaticLPToken, unstakeMaticLPToken } = useMaticLPStakingContract()
const { claimUsdtLPIXT, stakeUsdtLPToken, unstakeUsdtLPToken } = useUsdtLPStakingContract()

const stakeBalance = computed(() =>
  getFirstUserStakeInPool(pool)
)

const lockPeriod = computed(() =>
  isUnderLockPeriod(pool)
)

const depositActive = ref(false)
const withdrawActive = ref(false)

const { pool, type } = defineProps<{
  pool: StakingDataFragment,
  type: 'usdt' | 'matic'
}>()

const tokenBalance = computed(() => pool.stakingItems[0]?.userStakingData?.balanceOfToken ?? 0)

const onClickStake = (amount: number) => {
  if (type == 'usdt')
    stakeUsdtLPToken(amount)
  if (type == 'matic')
    stakeMaticLPToken(amount)
}

const onClickUnstake = (amount: number) => {
  if (type == 'usdt')
    unstakeUsdtLPToken(amount)
  if (type == 'matic')
    unstakeMaticLPToken(amount)
}

const claimReward = () => {
  if (type == 'usdt')
    claimUsdtLPIXT()
  if (type == 'matic')
    claimMaticLPIXT()
}
</script>