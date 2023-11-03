<template lang="pug">
HList(flex-grow="1")
  TitleDetail(flex-grow="1" icon="ixt")
    template(#detail) Claim Rewards
    template(#default) {{ roundToDecimals(reward, 4) }}

  Disabler(:disabled="reward == 0 || isUnderLockPeriod(pool) ")
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('claim')" :text="$t('general.claim')")

</template>


<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';

const { isUnderLockPeriod } = useStakingPools()


const { pool } = defineProps<{
  pool: StakingDataFragment,
}>()

const reward = computed(() => pool.userSpecificStakingData?.totalUserReward ?? 0)

</script>