<template lang="pug"> 
HList(v-for="item in data")
  Card(flex-grow="1")
    HList()
      TokenMedia(:token="item.token" w=100)
      VList(justify="between")
        CardTitle() {{ item.token.tokenInfo?.title }}
        TitleDetail()
          template(#detail) Shares Owned
          template(#default) {{ sharesOwned(item) }}
        TitleDetail()
          template(#detail) Shares Staked
          template(#default) {{ sharesStaked(item) }}

      TitleDetail()
        template(#detail) Total Earned
        timplate(#default) {{ item.userStakingData?.totalReward }}

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