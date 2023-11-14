<template lang="pug">
VList(space-y="3" w="full")
  HList(space-x="6")
    TitleDetail()
      template(#detail) {{ $t('index.yourStake') }}
      template(#default) {{ userStaked}}
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

const userReward = computed(() => {
  return data?.userSpecificStakingData?.totalUserReward?.toFixed(2) ?? 0
})

const userStaked = computed(() => {
  return data?.stakingItems?.map(item => {
    if (item?.token.tokenInfo?.type == 'energy')
      return 0

    return item?.userStakingData?.amountStaked ?? 0
  }).reduce((a, b) => a + b, 0)
})

const url = computed(() => {

  switch (id) {
    case "territory":
      return "/territories";
    case "energy":
      return "/energy";
    case "landmark":
      return "/landmarks";
    case "metashare":
      return "/metashare";
    default:
      return "";
  }
})

const onClick = () => {
  return navigateTo(url.value)
}
</script>