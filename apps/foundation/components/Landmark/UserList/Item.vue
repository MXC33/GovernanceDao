<template lang="pug"> 
Card(flex-grow="1")
  div(grid="~ cols-3")
    TokenMedia(:token="item.token" w="50")

    VList(grid="col-span-2")
      CardTitle() {{ item.token.tokenInfo?.title }}
        TitleDetail(my="3")
          template(#detail) Shares Owned
          template(#default) {{ sharesOwned }}
        TitleDetail(my="3")
          template(#detail) Shares Staked
          template(#default) {{ sharesStaked }}

        HList(space-x="5" mt="10")
          Disabler(:disabled="!canStake")
            ButtonGlitch(btn="~ primary-outline-cut" @click="stakeActive = true" :text="$t('landmarks.StakeBtn.title')")

          Disabler(:disabled="!canUnstake")
            ButtonGlitch(btn="~ primary-outline-cut" @click="unstakeActive = true" :text="$t('landmarks.UnstakeBtn.title')")


  template(#blackDetail)
    TitleDetail(space-y="3" mt="25")
      template(#detail) Total Earned
    TitleDetail(icon="ixt")
      template(#default) {{ item.userStakingData?.totalReward }} 
    ButtonGlitch(btn="~ primary-outline-cut" mt="3" @click="claimReward()" :text="$t('landmarks.claimButton')")


Teleport(to="#overlays")
  StakingActionLandmarkStake(@close="stakeActive = false" v-if="stakeActive" :item="item")

  StakingActionLandmarkUnstake(@close="unstakeActive = false" v-if="unstakeActive" :item="item")


</template>
  
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';

const { claimLandmarkRewardsById, stakeLandmark, unstakeLandmark } = useLandmarkStakingContract()

const stakeActive = ref(false)
const unstakeActive = ref(false)

const { item } = defineProps<{
  item: StakingItemFragment
}>()
const { canStake, canUnstake, sharesStaked, sharesOwned } = useStakingHelper(item)

const claimReward = () =>
  claimLandmarkRewardsById(item.token)

</script>