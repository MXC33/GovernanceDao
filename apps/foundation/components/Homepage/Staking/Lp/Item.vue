<template lang="pug">
StakingItem(:can-withdraw="stakeBalance > 0" @deposit="depositActive = true" @withdraw="withdrawActive = true")
  template(#title) {{ $t(`index.lpStaking.${type}.title`) }}
  template(#subtitle) {{ $t(`index.lpStaking.provide`) }}
  template(#icon)
    UsdtIXT_Icon(w="14" v-if="type == 'usdt'")
    MaticIXT_Icon(w="14" v-else)
  template(#metadata)
    HomepageStakingLpMetadata(:item="pool" v-if="pool")

  template(#detail)
    StakingRewards(:pool="pool" v-if="pool")

Teleport(to="#overlays")
  //- StakingActionDeposit(@close="depositActive = false" v-if="depositActive" :month="month" :pool="pool")

  //- StakingActionWithdraw(@close="withdrawActive = false" v-if="withdrawActive" :month="month" :pool="pool")
</template>

<script lang="ts" setup>
import { type StakingDataFragment } from '~/.nuxt/gql/default';

import UsdtIXT_Icon from '~/assets/images/usdt_ix.svg'
import MaticIXT_Icon from '~/assets/images/matic_ix.svg'
const { getFirstUserStakeInPool } = useStakingPools()

const stakeBalance = computed(() =>
  getFirstUserStakeInPool(pool)
)

const depositActive = ref(false)
const withdrawActive = ref(false)

console.log("STAKE BALANCE", stakeBalance.value)

const { pool } = defineProps<{
  pool: StakingDataFragment,
  type: 'usdt' | 'matic'
}>()
</script>