<template lang="pug">
Card()

  div(grid="~ cols-3" mx="-6" mt="-6" bg="black")
    TokenMedia(:token="data.token" h="60" pos="relative")

    VList(grid="col-span-2" items="center" justify="center" ) 
      img(:src="'/assets/metashare/' + data.token.tokenInfo?.tier + '-title.png'" h="auto" max-w="64")

  MetashareTrade(:staking-item="data")

  Divider(mx="-6")

  MetashareStake(:item="data")

  Divider(mx="-6")

  VList(space-y="3")
    CardTitle(:large="true") {{ $t('foundation.claimRewards') }}
    TitleDetail(icon="ixt") 
      template(#detail) {{ $t('general.rewards') }}
      template(#default) {{ roundToDecimals(data.userStakingData?.totalReward) }}

    ButtonInteractive(btn="~ primary-outline-cut" @click="claimRewardRequest(data)"  v-if="data" text="Claim" :loading="isLoading"  :loading-text="'Claiming Reward...'") 
</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql'

const { loading: isLoading, execute: claimRewardRequest } = useContractRequest(async (data: StakingItemFragment) => {
  return claimReward(data)
})

const { claimMetashareReward } = useMetashareStakingContract()

const { data } = defineProps<{
  data: StakingItemFragment
}>()


const claimReward = async (item: StakingItemFragment) => {
  await claimMetashareReward(item)
}
</script>