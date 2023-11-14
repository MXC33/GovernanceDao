<template lang="pug">
VList(space-y="3")
  CardTitle(:large="true") Stake

  HList(space-x="3")
    TitleDetail(v-for="listItem, index in listItems" :key="index" :icon="listItem.icon")
      template(#detail) {{ $t(`metashare.items.${listItem.id}`) }}
      template(#default) {{ listItem.amount }}

  div(grid="~ cols-2" space-x="3")
    Disabler(:disabled="!canStake")
      ButtonGlitch(btn="~ primary-outline-cut" @click="stakeActive = true" :text="$t('general.stake')")
    Disabler(:disabled="!canUnstake")
      ButtonGlitch(btn="~ primary-outline-cut" @click="unstakeActive = true" :text="$t('general.withdraw')")


Teleport(to="#overlays")
  StakingActionMetashareUnstake(@close="unstakeActive = false" v-if="unstakeActive" :item="item")
  StakingActionMetashareStake(@close="stakeActive = false" v-if="stakeActive" :item="item")

</template>
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';

const { item } = defineProps<{
  item: StakingItemFragment
}>()

const { canStake, canUnstake } = useStakingHelper(computed(() => item))


const stakeActive = ref(false)
const unstakeActive = ref(false)

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
    amount: roundToDecimals(item.userStakingData?.userRewardPerDay, 4)
  },
  {
    id: 'totalStaked',
    amount: item.totalStaked?.toLocaleString() ?? 0
  }
])

</script>