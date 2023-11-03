<template lang="pug">
Card()

  TokenVideo(:token="token" h="60" pos="relative")

  Divider(mx="-6")

  div(grid="~ cols-2" space-x="3")
    TitleDetail(icon="ixt") 
      template(#detail) {{ $t('general.rewards') }}
      template(#default) {{ roundToDecimals(totalReward) }}

    ButtonGlitch(btn="~ primary-outline-cut on-disabled:disabled" @click="claimReward(data)" :text="$t('general.claim')" :disabled="!staked")

  TerritoryStake(:item="data" :staked="staked")
  
</template>

<script lang="ts" setup>
import type { StakingItemFragment, NftFragment } from '#gql'

const { claimSpecificTerritoryReward } = useTerritoryStakingContract()

const { data, staked } = defineProps<{
  staked: boolean
  data: StakingItemFragment | NftFragment
}>()

const totalReward = computed(() => staked ? data?.userStakingData?.totalReward : 0)

const token = computed(() => staked ? data?.token : data)

const claimReward = (item: StakingItemFragment) => {
  return claimSpecificTerritoryReward(item.token)
}


</script>