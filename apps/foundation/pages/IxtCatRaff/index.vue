<template lang="pug">
Page()
  ButtonNav() 

  PageSection(section="CatRaff" :primary="true")
  card()
    CardChartItem()

  PageSection(section="StakingContract")
    CatRaffStakeContract()

  PageSection(section="PastWinnings")

  PageSection(section="TreasuryPool")
    CatRaffStakePool()

  PageSection(section="PastPrizes")
    Card()

  PageSection(section="Accounts")
    Card()

</template>

<script lang="ts" setup>

</script>