<template lang="pug">
Page()
  PageSection(section="dashboardStaking" :primary="true")
  Stake()
  PageSection(section="earnStaking")
  HList()
    Card(w="fit")
      TitleDetail()
        PageSection(section="ixtStakingInfo")
    Card(w="fit")
      TitleDetail()
        PageSection(section="lpStakingInfo")
  PageSection(section="ixtStaking")
    div(grid="~ cols-4 gap-6")
      Card(v-for="item in list" )
        div(grid="~ cols-2 gap-6")
          TitleDetail()
            template(#detail) Locking Period 
            template(#default) {{ item.lockingPeriod }} months
          TitleDetail()
            template(#detail) Multiplier
            template(#default) {{ item.multiplier }} x

      Card(grid="col-span-2")
        h3 Reward Pool

      CardDotted(grid="col-span-2")
        h3 Coming Soon 
        HList()
          button(btn="~ secondary") LEARN MORE

      button(btn="~ primary") CONNECT WALLET TO STAKE

  PageSection(section="territoryStaking")
  Card()
    HList()
      PageSection( section="assetStaking.territoryBox")
      StakingWrapper()
  PageSection(section="energyStaking")
  Card()
    HList()
      PageSection(section="assetStaking.energyBox")
      StakingWrapper()
  PageSection(section="landmarkStaking")
  Card()
    HList()
      PageSection(section="assetStaking.landmarkBox")
      StakingWrapper()
  PageSection(section="metashareStaking")
  Card()
    HList()
      PageSection(section="assetStaking.metashareBox")
      StakingWrapper()




</template>


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

interface YourTerritories {
  territory: string,
  staked: string,
  amount: number
}

const territories: YourTerritories[] = [{
  territory: "TERRITORY NFT STAKING",
  staked: "Total Staked",
  amount: 0
},
{
  territory: "ENERGY STAKING",
  staked: "Total Staked:",
  amount: 0
},
{
  territory: "LANDMARK NFT STAKING",
  staked: "Total Staked:",
  amount: 0

}
]

</script>