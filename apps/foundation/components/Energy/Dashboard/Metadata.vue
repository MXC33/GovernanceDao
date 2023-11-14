<template lang="pug">
div(grid="~ cols-3 gap-default" items-end)
  TitleDetail(icon="ixt")
    template(#detail)  {{ $t('energy.DailyIXT.title') }}
    template(#default) {{ roundToDecimals(dailyIxt, 4)}}
  TitleDetail() 
    template(#detail) {{ $t('energy.TVL.title') }}
    template(#default) {{ data.totalStakedAmount?.toLocaleString() }}

  TitleDetail(icon="ixt") 
    template(#detail) {{ $t('energy.IXTUnlocked.title') }}
    template(#default) {{ data.currentEpochPool?.toLocaleString() }}

  TitleDetail(icon="ixt")
    template(#detail) {{ $t('energy.YourStake.title') }}
    template(#default) {{ yourStake ?? 0 }}

  TitleDetail(icon="ixt")
    template(#detail) {{ $t('energy.ClaimableRewards.title') }}
    template(#default) {{ roundToDecimals(totalEnergyIXTReward) }}


</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '~/.nuxt/gql/default';


const { data } = defineProps<{
  data: StakingDataFragment
}>()

const { totalEnergyIXTReward } = useStakingPools()
const stakingDataEnergy = computed(() => data.stakingItems && data.stakingItems[1])

const dailyIxt = computed(() => stakingDataEnergy.value?.rewardPerDay)

const yourStake = computed(() => stakingDataEnergy.value?.userStakingData?.amountStaked)


</script>