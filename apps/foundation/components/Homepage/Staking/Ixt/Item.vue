<template lang="pug">
ClientOnly()
  StakingItem(@deposit="depositActive = true" @withdraw="withdrawActive = true" :can-withdraw="userStake > 0 && lockPeriod" :can-deposit="ixtBalance > 0")
    template(#title) {{ month }} {{ $t('general.month', month) }}
    template(#metadata)
      HomepageStakingIxtMetadata(:pool="pool")
    template(#detail)
      StakingRewards(:pool="pool" @claim="claimReward")

  Teleport(to="#overlays")
    StakingActionIXTDeposit(@close="depositActive = false" v-if="depositActive" :month="month" :pool="pool" @stake="onClickStake")

    StakingActionIXTWithdraw(@close="withdrawActive = false" v-if="withdrawActive"  :pool="pool" @withdraw="onClickUnstake")

</template>


<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';
import { stakePeriodToStakingId } from '@ix/base/composables/Contract/useIXTStakingContract';


const { pool, month } = defineProps<{
  pool: StakingDataFragment,
  month: number
}>()

const depositActive = ref(false)
const withdrawActive = ref(false)

const { stakeIXT, unstakeIXT, claimIXT } = useIXTStakingContract(stakePeriodToStakingId(month))
const { getUserStakeInPool, isUnderLockPeriod } = useStakingPools()
const userStake = computed(() => getUserStakeInPool('ixt', pool))
const { ixtBalance } = useCurrencyData()

const lockPeriod = computed(() =>
  isUnderLockPeriod(pool)
)

const onClickStake = (amount: number) => {
  stakeIXT(amount)
}

const onClickUnstake = (amount: number) => {
  unstakeIXT(amount)
}

const claimReward = () => {
  claimIXT()
}

</script>