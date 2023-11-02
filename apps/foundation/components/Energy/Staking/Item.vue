<template lang="pug">
ClientOnly()
  Card()
    HList(space-x="10")
      TitleDetail() 
        template(#detail) Locking period
        template(#default) 1 Month

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
      ButtonGlitch(btn="~ primary-outline-cut" @click="unstakeActive = true" :text="$t('energy.unstakeIxt')")
      ButtonGlitch(btn="~ primary-outline-cut" @click="stakeIxtActive = true" :text="$t('energy.stakeIxt')")
      ButtonGlitch(btn="~ primary-outline-cut" @click="stakeEnergyActive = true" :text="$t(`energy.stakeEnergy.${id}`)")

    template(#detailBottom)
      StakingRewards(:pool="data" v-if="data" @withdraw="claimReward")

  Teleport(to="#overlays")
    StakingActionEnergyStakeEnergy(@close="stakeEnergyActive = false" v-if="stakeEnergyActive && item[0]" :item="item[0]" :id="id")
    StakingActionEnergyStakeIXT(@close="stakeIxtActive = false" v-if="stakeIxtActive && item[1]" :item="item[1]" :month="1")
    StakingActionEnergyUnstakeIXT(@close="unstakeActive = false" v-if="unstakeActive && item[1]" :item="item[1]")

</template>
  
  
<script lang="ts" setup>
import { type StakingDataFragment } from '~/.nuxt/gql/default';
const { claimIXTAmeliaReward, claimIXTReward } = useEnergyStakingContract()


const { data, id } = defineProps<{
  id: string,
  data: StakingDataFragment
}>()

const item = data.stakingItems

const stakeEnergyActive = ref(false)
const stakeIxtActive = ref(false)

const unstakeActive = ref(false)

const { getUserStakeInPool } = useStakingPools()

const energyStaked = computed(() => getUserStakeInPool('energy', data))

const ixtStaked = computed(() => getUserStakeInPool('ixt', data))

const dailyRewards = computed(() => data.userSpecificStakingData?.totalUserRewardPerDay)

const userReward = computed(() => data.userSpecificStakingData?.totalUserReward)

const claimReward = () => {
  if (id == 'amelia')
    claimIXTAmeliaReward()
  if (id == 'energy')
    claimIXTReward()
}
</script>