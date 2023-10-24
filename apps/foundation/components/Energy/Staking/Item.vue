<template lang="pug">
Card()
  HList(space-x="10")
    TitleDetail() 
      template(#detail) Locking period
      template(#default) {{data.lockPeriod}}
    TitleDetail()
      template(#detail) Your Stake
      template(#default)
        HList(items="center" space-x="1")
          div {{ ixtStaked }}
          IXTIcon(w="5")
    TitleDetail()
      template(#detail) Your Stake
      template(#default) 
        HList(items="center" space-x="1")
          div {{ energyStaked }}
          img(src="~/assets/png/EnergyIcon.png" w="6")
    TitleDetail()
      template(#detail) Daily rewards
      template(#default) 
        HList(items="center" space-x="1")
          div {{ dailyRewards }}
          IXTIcon(w="5")
  HList(gap-6)
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('general.unstake')")
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('general.stake')")
  template(#detailBottom)
    HList(flex-grow="1")
      TitleDetail(flex-grow="1")
        template(#detail) Claim Rewards
        template(#default) {{ roundToDecimals(userReward, 4) }}
      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('general.claim')")
</template>
  
  
<script lang="ts" setup>

import IXTIcon from '~/assets/images/token.svg'
import { type StakingDataFragment, StakingId } from '~/.nuxt/gql/default';

const { id, data } = defineProps<{
  id: string,
  data: StakingDataFragment
}>()


const energyStaked = computed(() => {
  const staked = data.stakingItems?.find(item => item?.token?.tokenInfo?.type == 'energy')
  return staked?.userStakingData?.amountStaked
})

const ixtStaked = computed(() => {
  const staked = data.stakingItems?.find(item => item?.token?.tokenInfo?.type == 'ixt')
  return staked?.userStakingData?.amountStaked
})

const dailyRewards = computed(() => data.userSpecificStakingData?.totalUserRewardPerDay)

const userReward = computed(() => data.userSpecificStakingData?.totalUserReward)
</script>