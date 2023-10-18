<template lang="pug">
Page()
  Card(flex-grow="1")
    Div(grid="~ cols-5 gap-6 ")
      ButtonGlitch(@click="navigateTo('/territories')" tag="button" btn="~ form" text="Territories Staking" font="bold") 
      ButtonGlitch(@click="navigateTo('/energy')" tag="button" btn="~ form" text="Energy Staking" font="bold") 
      ButtonGlitch(@click="navigateTo('/landmarks')" tag="button" btn="~ form" text="Landmark Staking" font="bold") 
      ButtonGlitch(@click="navigateTo('/metashare')" tag="button" btn="~ form" text="Metashare Staking" font="bold") 
      ButtonGlitch(@click="navigateTo('/Governance')" tag="button" btn="~ form" text="Governance" font="bold")   

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