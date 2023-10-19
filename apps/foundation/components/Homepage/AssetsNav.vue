<template lang="pug">
VList(flex="~ space-x-10 items-center space-around" p="4" bg="gray-900")
  div(flex="~ cols-2 gap-12")     
    TitleDetail(px="5")
      template(#detail)
        div(flex="~ col space-x-4")
          div(text="")
            PageParagraphs(section="yourStake")
          div(text="xl" color="white" font="bold") {{ userStaked}}
    TitleDetail()
      template(#detail)
        ul(flex="~ col space-x-4")
          li(text="md") Your Reward:
          li(text="xl" color="white" font="bold") {{ userReward }}
    button(@click="onClick" btn="~ primary-outline") Go to {{ id }} staking

</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';



const { id, data } = defineProps<{
  id: string,
  data: StakingDataFragment | null
}>()

console.log("data", data)

const userReward = computed(() => {
  return data?.userSpecificStakingData?.totalUserReward?.toFixed(2)
})

const userStaked = computed(() => {
  return data?.stakingItems?.map(item => item?.userStakingData?.amountStaked ?? 0).reduce((a, b) => a + b, 0)
})

const url = computed(() => {

  switch (id) {
    case "territory":
      return "/territory";
    case "energy":
      return "/energy";
    case "landmark":
      return "/landmark";
    case "metashare":
      return "/metashare";
    default:
      return "";  // default URL or error handling if needed
  }
})

const onClick = () => {
  return navigateTo(url.value)
}
</script>