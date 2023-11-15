<template lang="pug">
ListItem(overflow-x="hidden")
  template(#image)
    TokenMedia(:token="token" flex-shrink="0")
  template(#title) {{ token?.tokenInfo?.title }}
  template(#description)
    p Balance: {{ token?.balance }}
    p 30 day yield: {{ getStakingDataFromToken(token)?.rewardPerThirtyDays?.toFixed(2) }} IXT
  template(#button)
    ButtonInteractive(@click="stakeMetashareRequest(token)"  v-if="token" text="Stake" min-w="55" cut="~ bottom-right sm b-ix-primary" :loading="isLoading"  :loading-text="'Staking...'") 
</template>
  
<script lang="ts" setup>
import type { NftFragment, StakingItemFragment } from '.nuxt/gql/default';
const { displaySnack } = useSnackNotifications()
const { stakeMetashare } = useMetashareStakingContract()


const { token, stakedTokens } = defineProps<{
  token: NftFragment
  stakedTokens: StakingItemFragment[]
}>()

const { loading: isLoading, execute: stakeMetashareRequest } = useContractRequest(async (token: NftFragment) => {
  return onClickStake(token)
})

const getStakingDataFromToken = (token: NftFragment) => {
  return stakedTokens?.find(item => item?.token?.tokenId === token.tokenId)
}


const onClickStake = async (token: NftFragment) => {
  if (token.balance) {
    const stakedMetashare = await stakeMetashare({ token, amount: token.balance })
    if (stakedMetashare)
      displaySnack("metashare-stake-success", "success")
  }
  return
}

</script>