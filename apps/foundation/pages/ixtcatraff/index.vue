<template lang="pug">
Page()
  PageSection(section="CatRaff" :primary="true")
    CardChart(:chart-data="chartData")

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
const { createChartData } = useChartData()

const totalPrize = computed(() => stakingData.value?.stakingItems[0]?.userStakingData?.totalReward)
const stakedAmount = computed(() => stakingData.value?.totalStakedAmount)

const stakedIXT = computed(() => stakingData.value?.stakingItems[0]?.userStakingData?.amountStaked)

const chartData = computed(() => createChartData(transactionData.value, stakedAmount.value, catRaffStakingAddress.polygon))

const transactionTimestamps = computed(() => transactionData.value ? transactionData.value.map(item => Number(item.timeStamp)) : [])

await Promise.all([
  fetchCatRaffData(),
  fetchCatRaffAccounts(),
  fetchCatRaffPrizes(),
  fetchCatRaffWeekly(),
  fetchTransactionData()
]);
</script>
