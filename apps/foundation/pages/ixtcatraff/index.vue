<template lang="pug">
Page()
  PageSection(section="CatRaff" :primary="true")
    CardChart(:data="chartInfo")
      template(#title)
        CardTitle()
          template(#default) Prize Pool
          template(#detail) Track balances
      template(#details)
        TitleDetail()
          template(#detail) Total Deposits
          template(#default) 0
        TitleDetail()
          template(#detail) Weekly Odds
          template(#default) 0
        TitleDetail()
          template(#detail) Weekly Prize
          template(#default) 2500
        TitleDetail()
          template(#detail) Next Draw
          template(#default) 0

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

const stakedIXT = computed(() => stakingData.value?.stakingItems[0]?.userStakingData?.amountStaked)

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


await Promise.all([
  fetchCatRaffData(),
  fetchCatRaffAccounts(),
  fetchCatRaffPrizes(),
  fetchCatRaffWeekly(),
  fetchTransactionData()
]);
</script>
