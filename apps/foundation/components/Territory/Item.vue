<template lang="pug">
Card()

  TokenMedia(:token="data.token" h="60" pos="relative")

  Divider(mx="-6")

  div(grid="~ cols-2" space-x="3")
    TitleDetail(icon="ixt") 
      template(#detail) {{ $t('general.rewards') }}
      template(#default) {{ roundToDecimals(data.userStakingData?.totalReward) }}

    ButtonGlitch(btn="~ primary-outline-cut" @click="claimReward(data)" :text="$t('general.claim')")

  TerritoryStake(:item="data")
  
</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql'

const { claimSpecificTerritoryReward } = useTerritoryStakingContract()

const { data } = defineProps<{
  data: StakingItemFragment
}>()

const claimReward = (item: StakingItemFragment) => {
  return claimSpecificTerritoryReward(item.token)
}


console.log("data", data.token)
</script>