<template lang="pug">
Page()
  HList(grid="~ gap-6")
    router-link(to="/territories" tag="button" btn="~ secondary") Territories Staking
    router-link(to="/energy" tag="button" btn="~ secondary") Energy Staking
    router-link(to="/landmarks" tag="button" btn="~ secondary") Landmarks Staking
    router-link(to="/metashare" tag="button" btn="~ secondary") MetaShare Staking
    router-link(to="/governance" tag="button" btn="~ secondary") Governance  

  PageSection(section="dashboardStaking" :primary="true")

  HomepageDashboard()
  HomepageStaking()
  PageSection(section="ixtStaking")
  Stake()
  PageSection(section="lpStaking")
  HomepageLP()
  HomepageTerritories()
  HomepageGovernance()

</template>

<style></style>


<script lang="ts" setup>

interface StakingInfo {
  lockingPeriod: number,
  multiplier: number
}

const list: StakingInfo[] = [{
  lockingPeriod: 12,
  multiplier: 4
},
{
  lockingPeriod: 6,
  multiplier: 2.5
},
{
  lockingPeriod: 3,
  multiplier: 1.5
},
{
  lockingPeriod: 1,
  multiplier: 1
}
]


</script>