<template lang="pug">
SimpleTable(:rows="rows" :columns="columns" pb="3")
  template(#col-asset="{index}") 
    HList(items="center" space-x="3") 
      TokenMedia(:token="tokens[index]" w="16" h="16" flex-shrink="0")
      TokenName(:token="tokens[index]" font="bold")

</template>
  
<script lang="ts" setup>
import type { StakingItemFragment } from '.nuxt/gql/default';
import type { SimpleTableColumn, SimpleTableRow } from '@ix/base/composables/useSimpleTable';

const { stakedTokens } = defineProps<{
  stakedTokens: StakingItemFragment[]
}>()

const tokens = computed(() => stakedTokens.map((item) => item.token))

const rows = computed<SimpleTableRow[]>(() =>
  stakedTokens.map((item) => ({
    items: [
      item.token?.tokenInfo?.title,
      item.userStakingData?.amountStaked,
      `${roundToDecimals(item.userStakingData?.userRewardPerDay, 5)} IXT`,
      `${roundToDecimals(item.userStakingData?.userRewardPerThirtyDays, 5)} IXT`
    ]
  }))
)
const columns: SimpleTableColumn[] = [
  { title: "Asset", id: "asset", width: 300 },
  { title: "Staked amount", },
  { title: "24h yield", },
  { title: "30 days yield", }
]


</script>