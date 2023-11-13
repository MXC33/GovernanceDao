<template lang="pug">
ClientOnly()
  Card(flex-grow="1")
    div(grid="~ cols-1 md:cols-3 gap-6")
      TokenMedia(:token="item.token")
      Divider(mx="-6" v-if="isMobile")
      VList()
        CardTitle() {{ item.token.tokenInfo?.title }}
          TitleDetail(my="3" )
            template(#detail) Shares Owned
            template(#default) {{ sharesOwned }}
          TitleDetail(my="3")
            template(#detail) Shares Staked
            template(#default) {{ sharesStaked }}
          Divider(mx="-6" v-if="isMobile")
          HList(space-x="5" mt="lg:20 sm: 5" justify="between")
            Disabler(:disabled="!canStake")
              ButtonGlitch(btn="~ primary-outline-cut" @click="stakeActive = true" :text="$t('landmarks.StakeBtn.title')")

            Disabler(:disabled="!canUnstake")
              ButtonGlitch(btn="~ primary-outline-cut" @click="unstakeActive = true" :text="$t('landmarks.UnstakeBtn.title')")


    template(#blackDetail v-if="!isMobile")
      TitleDetail(space-y="3" mt="30")
        template(#detail) Total Earned
      TitleDetail(icon="ixt")
        template(#default) {{ roundToDecimals(item.userStakingData?.totalReward) }} 
      Disabler(:disabled="!canClaim")
        ButtonInteractive(btn="~ primary-outline-cut" mt="3" @click="claimRequest" :text="$t('landmarks.claimButton')" :loading="isLoading")

    template(#detailBottom v-if="isMobile")
      TitleDetail(space-y="3")
        template(#detail) Total Earned
        TitleDetail(icon="ixt")
          template(#default) {{ roundToDecimals(item.userStakingData?.totalReward) }}
      Disabler(:disabled="!canClaim")
        ButtonInteractive(btn="~ primary-outline-cut" mt="3" @click="claimRequest" :text="$t('landmarks.claimButton')" :loading="isLoading" :loading-text="'Claiming Reward...'")




  Teleport(to="#overlays")
    StakingActionLandmarkStake(@close="stakeActive = false" v-if="stakeActive" :item="item")

    StakingActionLandmarkUnstake(@close="unstakeActive = false" v-if="unstakeActive" :item="item")


</template>
  
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';

const { loading: isLoading, execute: claimRequest } = useContractRequest(async () => {
  return claimReward()
})

const { isMobile } = useDevice()

const { claimLandmarkRewardsById } = useLandmarkStakingContract()

const stakeActive = ref(false)
const unstakeActive = ref(false)

const { item } = defineProps<{
  item: StakingItemFragment
}>()
const { canStake, canUnstake, sharesStaked, sharesOwned, canClaim } = useStakingHelper(computed(() => item))

const claimReward = async () =>
  await claimLandmarkRewardsById(item.token)


</script>