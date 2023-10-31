<template lang="pug"> 
HList(v-for="item in data")
  Card(flex-grow="1")
    div(grid="~ cols-3")
      TokenMedia(:token="item.token" w=50)
      VList()
        CardTitle() {{ item.token.tokenInfo?.title }}
          TitleDetail(my="3")
            template(#detail) Shares Owned
            template(#default) {{ sharesOwned(item) }}
          TitleDetail(my="3")
            template(#detail) Shares Staked
            template(#default) {{ sharesStaked(item) }}
          HList(space-x="5" mt="10")
            ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('deposit')" :text="$t('landmarks.StakeBtn.title')")
            ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('landmarks.UnstakeBtn.title')")


    template(#blackDetail)
      TitleDetail(space-y="3" mt="25")
        template(#detail) Total Earned
      TitleDetail(icon="ixt")
        template(#default) {{ item.userStakingData?.totalReward }} 
      ButtonGlitch(btn="~ primary-outline-cut" mt="3" @click="claimReward(item)" :text="$t('landmarks.claimButton')")



</template>
  
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';

const { claimLandmarkRewardsById, stakeLandmark, unstakeLandmark } = useLandmarkStakingContract()

const { data } = defineProps<{
  data: StakingItemFragment[]
}>()

const sharesOwned = (item: StakingItemFragment) => ((item.userStakingData?.amountStaked ?? 0) + (item.userStakingData?.balanceOfToken ?? 0))

const sharesStaked = (item: StakingItemFragment) => (item.userStakingData?.amountStaked ?? 0)


const claimReward = (item: StakingItemFragment) => {
  return claimLandmarkRewardsById(item.token)
}

</script>