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
    template(#default) {{ roundToDecimals(claimableRewards, 5) }}


</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '~/.nuxt/gql/default';


const { data } = defineProps<{
  data: StakingDataFragment
}>()

const stakingDataEnergy = computed(() => data.stakingItems && data.stakingItems[1])
const stakingDataAmelia = computed(() => data.stakingItems && data.stakingItems[0])


const dailyIxt = computed(() => stakingDataEnergy.value?.rewardPerDay)

const yourStake = computed(() => stakingDataEnergy.value?.userStakingData?.amountStaked)

const claimableRewards = computed(() =>
  (stakingDataEnergy.value?.userStakingData?.totalReward ?? 0) + (stakingDataAmelia.value?.userStakingData?.totalReward ?? 0)
)

console.log("CLAIM", stakingDataEnergy.value?.userStakingData, stakingDataAmelia.value?.userStakingData)

</script>