<template lang="pug">
VList(space-y="3")
  CardTitle(:large="true") Stake

  HList(space-x="3")
    TitleDetail(v-for="listItem, index in listItems" :key="index" :icon="listItem.icon")
      template(#detail) {{ $t(`metashare.items.${listItem.id}`) }}
      template(#default) {{ listItem.amount }}

  div(grid="~ cols-2" space-x="3")
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('general.stake')")
    ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('general.withdraw')")

</template>
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';

const { item } = defineProps<{
  item: StakingItemFragment
}>()

interface ListItem {
  id: string,
  icon?: 'ixt',
  amount: number | string
}

const listItems = computed<ListItem[]>(() => [
  {
    id: 'sharesOwned',
    amount: item.userStakingData?.balanceOfToken ?? 0
  },
  {
    id: 'sharesStaked',
    amount: item.userStakingData?.amountStaked ?? 0
  },
  {
    id: 'dailyYield',
    icon: 'ixt',
    amount: roundToDecimals(item.userStakingData?.userRewardPerDay)
  },
  {
    id: 'totalStaked',
    amount: item.totalStaked?.toLocaleString() ?? 0
  }
])

</script>