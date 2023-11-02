<template lang="pug">
ClientOnly()
  StakingItem(@deposit="depositActive = true" @withdraw="withdrawActive = true" :can-withdraw="userStake > 0")
    template(#title) {{ month }} {{ $t('general.month', month) }}
    template(#metadata)
      HomepageStakingIxtMetadata(:pool="pool")
    template(#detail)
      StakingRewards(:pool="pool")

  Teleport(to="#overlays")
    StakingActionIXTDeposit(@close="depositActive = false" v-if="depositActive" :month="month" :pool="pool" @stake="onClickStake")

    StakingActionIXTWithdraw(@close="withdrawActive = false" v-if="withdrawActive"  :data="pool" @withdraw="onClickUnstake")

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

const { stakeIXT, unstakeIXT } = useIXTStakingContract(stakePeriodToStakingId(month))
const { getUserStakeInPool } = useStakingPools()
const userStake = computed(() => getUserStakeInPool('ixt', pool))


const onClickStake = (amount: number) => {
  stakeIXT(amount)
}

const onClickUnstake = (amount: number) => {
  unstakeIXT(amount)
}

</script>