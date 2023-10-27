<template lang="pug"> 
HList(v-for="item in data")
  Card(flex-grow="1")
    div(grid="~ cols-4 gap-12")
      TokenMedia(:token="item.token" grid="col-span-2" w=100)
      VList()
        CardTitle() {{ item.token.tokenInfo?.title }}
          TitleDetail()
            template(#detail) Shares Owned
            template(#default) {{ sharesOwned(item) }}
          TitleDetail()
            template(#detail) Shares Staked
            template(#default) {{ sharesStaked(item) }}

    template(#detailRight)  
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