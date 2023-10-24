<template lang="pug">
Page()
  ButtonNav()  

  PageSection(section="dashboardStaking" :primary="true")
    HomepageDashboard()

  PageSection(section="earnStaking")
    HomepageStakingEarn()

  PageSection(section="ixtStaking")
    HomepageStakingIxt()

  PageSection(section="lpStaking")
    HomepageStakingLp()

  HomepageAsset()

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