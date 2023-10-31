<template lang="pug">
Page()
  ButtonNav() 

  PageSection(section="CatRaff" :primary="true")
    CardChartItem()

  PageSection(section="StakingContract")
    div(grid="~ cols-2" space-x="6")
      CatRaffInputItem(id="stake")
      CatRaffInputItem(id="ticket")
    div(grid="~ cols-2" space-x="6")
      CatRaffStakingItem(id="withdraw")
      CatRaffStakingItem(id="claim")


  PageSection(section="PastWinnings")
    CatRaffWeekly()
  PageSection(section="TreasuryPool")
    CatRaffTreasury()
  PageSection(section="PastPrizes")


  PageSection(section="Accounts")
    Card()

</template>

<script lang="ts" setup>
import { StakingId } from '~/.nuxt/gql/default';

const { data: stakingData, execute: fetchCatRaffData } = useStakingData(StakingId.CatRaff)
const { data: accountData, execute: fetchCatRaffAccounts } = useCatRaffAccounts()
const { data: prizeData, execute: fetchCatRaffPrizes } = useCatRaffPrizes()
const { data: weeklyData, execute: fetchCatRaffWeekly } = useCatRaffWeekly()

console.log('Cat Raff Data:', stakingData.value);
console.log('Cat Raff Accounts:', accountData.value);
console.log('Cat Raff Prizes:', prizeData.value);
console.log('Cat Raff Weekly:', weeklyData.value);




await Promise.all([
  fetchCatRaffData(),
  fetchCatRaffAccounts(),
  fetchCatRaffPrizes(),
  fetchCatRaffWeekly()
])

</script>