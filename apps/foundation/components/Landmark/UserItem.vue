<template lang="pug"> 
HList(v-for="item in data")
  Card(flex-grow="1")
    div(grid="~ cols-3" )
      TokenMedia(:token="item.token" grid="col-1" w=50)
      VList()
        CardTitle() {{ item.token.tokenInfo?.title }}
          TitleDetail(space-y="1")
            template(#detail) Shares Owned
            template(#default) {{ sharesOwned(item) }}
          TitleDetail(space-y="1")
            template(#detail) Shares Staked
            template(#default) {{ sharesStaked(item) }}
          HList(space-x="3")
            ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('')" :text="$t('landmarks.StakeBtn.title')")
            ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('')" :text="$t('landmarks.UnstakeBtn.title')")

    template(#detailRight)
      TitleDetail(space-y="3")
        template(#detail) Total Earned
        template(#default :style="{ fontSize: '24px', marginBottom: '10px' }") {{ item.userStakingData?.totalReward }}
          ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('claim')" :text="$t('landmarks.claimButton')")


</template>
  
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';


const { data } = defineProps<{
  data: StakingItemFragment[]
}>()

const sharesOwned = (item: StakingItemFragment) => ((item.userStakingData?.amountStaked ?? 0) + (item.userStakingData?.balanceOfToken ?? 0))

const sharesStaked = (item: StakingItemFragment) => (item.userStakingData?.amountStaked ?? 0)


</script>