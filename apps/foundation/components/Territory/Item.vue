<template lang="pug">
Card()

  div(font="bold") {{ token.tokenInfo.title }}
  TokenVideo(:token="token" h="60" pos="relative" fill="contain")
  Divider(mx="-6")

  div(grid="~ md:cols-2" space-x="3")
    TitleDetail(icon="ixt") 
      template(#detail) {{ $t('general.rewards') }}
      template(#default) {{ roundToDecimals(totalReward) }}

    ButtonInteractive(btn="~ primary-outline-cut on-disabled:disabled" @click="claimRequest(data)" :text="$t('general.claim')" :disabled="!staked" :loading="isLoading" :loading-text="'Claiming...'")

  TerritoryStake(:item="data" :staked="staked")
  
</template>

<script lang="ts" setup>
import type { StakingItemFragment, NftFragment } from '#gql'
const { loading: isLoading, execute: claimRequest } = useContractRequestFnd(async (data: StakingItemFragment) => {
  return claimReward(data)
}, 'claim')

const { claimSpecificTerritoryReward } = useTerritoryStakingContract()

const { data, staked } = defineProps<{
  staked: boolean
  data: StakingItemFragment | NftFragment
}>()

const totalReward = computed(() => staked ? data?.userStakingData?.totalReward : 0)

const token = computed(() => staked ? data?.token : data)

const claimReward = async (item: StakingItemFragment) => {
  return await claimSpecificTerritoryReward(item.token)
}


</script>