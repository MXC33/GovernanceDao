<template lang="pug">
Page()
  PageSection(section="CatRaff" :primary="true")
    CardChartItem()

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

const totalPrize = computed(() => stakingData.value?.stakingItems[0]?.userStakingData?.totalReward)
const stakedIXT = computed(() => stakingData.value?.stakingItems[0]?.userStakingData?.amountStaked)


await Promise.all([
  fetchCatRaffData(),
  fetchCatRaffAccounts(),
  fetchCatRaffPrizes(),
  fetchCatRaffWeekly(),
]);
</script>
