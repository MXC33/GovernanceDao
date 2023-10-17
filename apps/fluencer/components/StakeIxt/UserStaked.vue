<template lang="pug">
DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900" max-h="auto")
  template(#header)
    div Staked IXT

  template(#default)
    DrawerContentBody(p="0")

      SimpleTable(:columns="cols" :rows="rows")
        template(#row-asset) 
          HList(items="center" space-x="3") 
            img(src="~/assets/images/ixt-coin.png" aspect="square" min-w="0" max-w="12")
            div(text="subheading") IXT

</template>

<script lang="ts" setup>
import { type StakingDataFragment, StakingId } from '~/.nuxt/gql/default';

import type { SimpleTableColumn, SimpleTableRow } from 'composables/useSimpleTable';
import type { TokenSpecificUserStakingDataFragment } from '#gql';
const { formattedMonths } = useStakingHelper()
const { data: ixtOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { data: ixtThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { data: ixtSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { data: ixtTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)

interface UserStakePeriod {
  months: number
  stakeInfo: TokenSpecificUserStakingDataFragment
}

const userStakePeriods = computed<UserStakePeriod[]>(() => [
  setupUserStakingPeriod(ixtOneMonthData.value, 1),
  setupUserStakingPeriod(ixtThreeMonthData.value, 3),
  setupUserStakingPeriod(ixtSixMonthData.value, 6),
  setupUserStakingPeriod(ixtTwelveMonthData.value, 12)
].filter(Boolean) as UserStakePeriod[])

const rows = computed<SimpleTableRow[]>(() =>
  userStakePeriods.value.map(({ months, stakeInfo: { amountStaked, userRewardPerDay, userRewardPerThirtyDays } }) => ({
    items: [
      "IXT",
      amountStaked,
      formattedMonths(months),
      `${userRewardPerDay} IXT`,
      `${userRewardPerThirtyDays} IXT`
    ]
  }))
)
const cols: SimpleTableColumn[] = [
  { title: "Asset", id: "asset" },
  { title: "Staked amount" },
  { title: "Staking period" },
  { title: "24h yield" },
  { title: "30 days yield" }
]

const setupUserStakingPeriod = (stakingData: StakingDataFragment | null, month: number): UserStakePeriod | null => {
  if (!stakingData)
    return null


  const stakeInfo = stakingData?.stakingItems && stakingData?.stakingItems[0]?.userStakingData

  if (!stakeInfo)
    return null

  return {
    months: month,
    stakeInfo
  }
}

</script>