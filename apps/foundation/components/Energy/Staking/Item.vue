<template lang="pug">
Card()
  HList(space-x="10")
    TitleDetail() 
      template(#detail) Locking period
      template(#default) {{data.lockPeriod}}

    TitleDetail(icon="ixt")
      template(#detail) Your Stake
      template(#default) {{ ixtStaked }}

    TitleDetail(icon="energy")
      template(#detail) Your Stake
      template(#default) {{ energyStaked }}

    TitleDetail(icon="ixt")
      template(#detail) Daily rewards
      template(#default) {{roundToDecimals(dailyRewards)}}

  HList(gap-6)
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('unstake')" :text="$t('general.unstake')")
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('stake')" :text="$t('general.stake')")

  template(#detailBottom)
    StakingRewards(:pool="data" v-if="data")

</template>
  
  
<script lang="ts" setup>
import { type StakingDataFragment } from '~/.nuxt/gql/default';

const { data } = defineProps<{
  id: string,
  data: StakingDataFragment
}>()

const { getUserStakeInPool } = useStakingPools()

const energyStaked = computed(() => getUserStakeInPool('energy', data))

const ixtStaked = computed(() => getUserStakeInPool('ixt', data))

const dailyRewards = computed(() => data.userSpecificStakingData?.totalUserRewardPerDay)

const userReward = computed(() => data.userSpecificStakingData?.totalUserReward)
</script>