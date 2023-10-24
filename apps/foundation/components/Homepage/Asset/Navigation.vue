<template lang="pug">
VList(space-y="3" w="full")
  div(grid="~ cols-2 gap-3")
    HList(justify="center" text="center")     
      TitleDetail()
        template(#detail) {{ $t('index.yourStake') }}
        template(#default) {{ userStaked}}

    HList(justify="center" text="center")     
      TitleDetail()
        template(#detail) {{ $t('index.totalRewards') }}
        template(#default) {{ userReward }}

  ButtonGlitch(@click="onClick" btn="~ primary-outline" cut="~ bottom-right b-ix-primary" :text="$t(`index.assetStaking.${id}.button`)")

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