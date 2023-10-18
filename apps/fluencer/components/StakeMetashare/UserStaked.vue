<template lang="pug">
SimpleTable(:rows="rows" :columns="columns" pb="3")
  template(#row-asset="{index}") 
    HList(items="center" space-x="3") 
      TokenMedia(:token="tokens[index]" w="16" h="16" flex-shrink="0")
      TokenName(:token="tokens[index]" font="bold")

//
  template(#image)
    TokenMedia(:token="data?.token")
  template(#title) {{ data?.token?.tokenInfo?.title }}
  template(#description)
    p Staked: {{ data?.userStakingData?.amountStaked }}
  template(#info)
    HList(space-x="2")
      div 30 day reward: 
      div(font="bold") {{ data?.userStakingData?.userRewardPerThirtyDays?.toFixed(2) }} IXT
</template>
  
<script lang="ts" setup>
import type { StakingItemFragment } from '.nuxt/gql/default';
import type { SimpleTableColumn, SimpleTableRow } from 'composables/useSimpleTable';

const { stakedTokens } = defineProps<{
  stakedTokens: StakingItemFragment[]
}>()

const tokens = computed(() => stakedTokens.map((item) => item.token))

const rows = computed<SimpleTableRow[]>(() =>
  stakedTokens.map((item) => ({
    items: [
      item.token?.tokenInfo?.title,
      item.userStakingData?.amountStaked,
      `${item.userStakingData?.userRewardPerDay} IXT`,
      `${item.userStakingData?.userRewardPerThirtyDays} IXT`
    ]
  }))
)
const columns: SimpleTableColumn[] = [
  { title: "Asset", id: "asset" },
  { title: "Staked amount" },
  { title: "24h yield" },
  { title: "30 days yield" }
]


</script>