<template lang="pug">
Page()
  PageSection(section="CatRaff" :primary="true")
    CardChart(:data="chartInfo" :displaying-ixt="true")
      template(#title)
        CardTitle()
          template(#default) Prize Pool
          template(#detail) Track balances
      template(#details)
        TitleDetail(icon="ixt")
          template(#detail) Total Deposits
          template(#default) {{ totalDeposits?.toLocaleString() }}
        TitleDetail()
          template(#detail) Weekly Odds
          template(#default) {{roundToDecimals(odds)}}%
        TitleDetail(icon="ixt")
          template(#detail) Weekly Prize
          template(#default) 2500
        TitleDetail()
          template(#detail) Next Draw
          template(#default) {{nextDrawing}}

  PageSection(section="StakingContract")
    div(grid="~ md:cols-2 gap-default")
      CatRaffStakeItem()
      CatRaffOldTickets(:data="stakingData")

    div(grid="~ md:cols-2 gap-default")
      CatRaffWithdrawItem(:data="stakingData")

      CatRaffClaimItem(:data="stakingData")
        template(#detail)
          div() Available:
          TitleDetail(:icon="'ixt'")
          div() {{totalPrize}}
        template(#box)
          div() {{totalPrize}}
          TitleDetail(:icon="'ixt'")


  PageSection(section="PastWinnings")
    CatRaffWeekly(:data="weeklyData")
  PageSection(section="TreasuryPool")
    CatRaffTreasury(:staking-data="stakingData" :weekly-data="weeklyData")
  PageSection(section="PastPrizes")
    CatRaffPastPrizes(:data="prizeData")

  PageSection(section="Accounts")
    CatRaffAccounts(:data="accountData")

</template>

<script lang="ts" setup>
import type { ChartInfo } from "composables/useChartData";
import { StakingId } from "~/.nuxt/gql/default";

const { data: stakingData, execute: fetchCatRaffData } = useStakingData(
  StakingId.CatRaff,
);
const { data: accountData, execute: fetchCatRaffAccounts } =
  useCatRaffAccounts();
const { data: prizeData, execute: fetchCatRaffPrizes } = useCatRaffPrizes();
const { data: weeklyData, execute: fetchCatRaffWeekly } = useCatRaffWeekly();
const { catRaffTransactions } = useChainTransactions()

const { data: transactionData, execute: fetchTransactionData } = catRaffTransactions()
const { createChartData, formattedDatesArray } = useChartData()

const totalPrize = computed(() => stakingData.value?.stakingItems[0]?.userStakingData?.totalReward)
const stakedAmount = computed(() => stakingData.value?.totalStakedAmount)

const chartData = computed(() => {
  if (!transactionData.value || !stakedAmount.value || !catRaffStakingAddress.polygon)
    return []

  return createChartData(transactionData.value, stakedAmount.value, catRaffStakingAddress.polygon)
});

const chartInfo = computed<ChartInfo>(() => {
  return {
    data: chartData.value,
    labels: formattedDatesArray.value
  }
})

const odds = computed(() => {
  if (!stakingData.value?.stakingItems[0]?.odds)
    return 0
  return stakingData.value.stakingItems[0].odds * 100
})

const totalDeposits = computed(() => stakingData.value?.totalStakedAmount)

const nextDrawing = computed(() => {
  if (!weeklyData.value || weeklyData.value.length == 0)
    return 0
  const currentWeek = weeklyData.value?.[weeklyData.value?.length - 1]?.week ?? 0
  return calculateEndDate(currentWeek)
})
await Promise.all([
  fetchCatRaffData(),
  fetchCatRaffAccounts(),
  fetchCatRaffPrizes(),
  fetchCatRaffWeekly(),
  fetchTransactionData()
]);
</script>
