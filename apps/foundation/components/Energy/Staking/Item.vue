<template lang="pug">
ClientOnly()
  Card()
    div(grid="~ cols-2 lg:cols-4")
      TitleDetail() 
        template(#detail) Locking period
        template(#default) 1 Month

      TitleDetail(icon="ixt" v-if="id == 'energy'")
        template(#detail) Your Stake
        template(#default) {{ ixtStaked }}

      TitleDetail(icon="energy")
        template(#detail) Your unit(s)
        template(#default) {{ energyStaked }}

      TitleDetail(icon="ixt")
        template(#detail) Daily rewards
        template(#default) {{roundToDecimals(dailyRewards)}}

    div(flex="~ col md:row" gap="4 lg:6")
      Disabler(:disabled="ixtStaked == 0" v-if="id == 'energy'")
        ButtonGlitch(btn="~ primary-outline-cut lt-md:sm" @click="unstakeActive = true" :text="$t('energy.unstakeIxt')")
      Disabler(:disabled="ixtBalance == 0" v-if="id == 'energy'")
        ButtonGlitch(btn="~ primary-outline-cut lt-md:sm" @click="stakeIxtActive = true" :text="$t('energy.stakeIxt')")
      Disabler(:disabled="energyBalance == 0 || totalEnergyStaked >= energyIXTStaked")
        ButtonGlitch(btn="~ primary-outline-cut lt-md:sm" @click="stakeEnergyActive = true" :text="$t(`energy.stakeEnergy.${id}`)")

    template(#detailBottom)
      StakingRewards(:pool="data" v-if="data" @claim="claimReward")

  Teleport(to="#overlays")
    StakingActionEnergyStakeEnergy(@close="stakeEnergyActive = false" v-if="stakeEnergyActive && item[0]" :item="item[0]" :id="id")
    StakingActionEnergyStakeIXT(@close="stakeIxtActive = false" v-if="stakeIxtActive && item[1]" :item="item[1]" :month="1")
    StakingActionEnergyUnstakeIXT(@close="unstakeActive = false" v-if="unstakeActive && item[1]" :item="item[1]")

</template>
  
  
<script lang="ts" setup>
import { type StakingDataFragment } from '~/.nuxt/gql/default';
const { claimIXTAmeliaReward, claimIXTReward } = useEnergyStakingContract()


const { data, id } = defineProps<{
  id: 'amelia' | 'energy',
  data: StakingDataFragment
}>()

const item = computed(() => data.stakingItems)

const stakeEnergyActive = ref(false)
const stakeIxtActive = ref(false)

const unstakeActive = ref(false)

const { getUserStakeInPool, getUserTokenBalance, totalEnergyStaked, energyIXTStaked } = useStakingPools()

const energyStaked = computed(() => getUserStakeInPool('energy', data))

const ixtStaked = computed(() => getUserStakeInPool('ixt', data))

const dailyRewards = computed(() => data.userSpecificStakingData?.totalUserRewardPerDay)

const energyBalance = computed(() => getUserTokenBalance('energy', data))
const ixtBalance = computed(() => getUserTokenBalance('ixt', data))


const claimReward = () => {
  if (id == 'amelia')
    claimIXTAmeliaReward()
  if (id == 'energy')
    claimIXTReward()
}
</script>