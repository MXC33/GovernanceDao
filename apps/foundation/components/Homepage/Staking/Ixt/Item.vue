<template lang="pug">
StakingItem(@deposit="depositActive = true")
  template(#title) {{ month }} {{ $t('general.month', month) }}
  template(#metadata)
    HomepageStakingIxtMetadata(:pool="pool")
  template(#detail)
    StakingRewards(:pool="pool")

Teleport(to="#overlays")
  StakingActionDeposit(@close="depositActive = false" v-if="depositActive" :month="month" :pool="pool")

</template>


<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';
const depositActive = ref(false)
const { pool } = defineProps<{
  pool: StakingDataFragment,
  month: number
}>()

</script>