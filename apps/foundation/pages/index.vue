<template lang="pug">
Page()
  PageSection(section="dashboardStaking" :primary="true")
  HList(grid="~ gap-6")
    router-link(to="/territories" tag="button" btn="~ secondary") Territories Staking
    router-link(to="/energy" tag="button" btn="~ secondary") Energy Staking
    router-link(to="/landmarks" tag="button" btn="~ secondary") Landmarks Staking
    router-link(to="/metashare" tag="button" btn="~ secondary") MetaShare Staking
    router-link(to="/governance" tag="button" btn="~ secondary") Governance  

  HList(grid="~ cols-2" b="solid 1 red")
    VList(space-x-6 b="solid 1 purple")
      h3(color="gray" text="xl") Stake IXT, earn up to
      h1(text="bold 5xl" color="#84D4BC") 18,88% APY
      button(color="gray" text="xl") Buy IXT 
      button(color="gray" text="xl") Add IXT to wallet 
      CardChart()
    VList(grid="~" space-y="12" b="solid 1 yellow" flex-direction-row) 
      TableDashboard(w="xl")
      HList()
        Card(w="xs") 
          TitleDetail()
            h3() Circulating Supply
            h4(color="orange") See on coinGecko
        Card(w="xs")
          TitleDetail()
            h3() Distribution today
            h4() 36,936.63 (ICON) 
  Stake()



  PageSection(section="earnStaking")
  HList(grid="~ gap-6")
    Card(w="fit")
      TitleDetail()
        PageSection(section="ixtStakingInfo")
    Card(bg="black" rounded="bl br" flex-grow)
      IXTIcon(w="25" class="ml-2")
    Card(w="fit" rounded="br tr")
      TitleDetail()
        PageSection(section="lpStakingInfo")
    Card(bg="black" rounded="br tr" flex-grow)
      IXTIcon(w="25" class="ml-2")


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
  Card(p=0 )
    HList()
      PageSection( section="assetStaking.territoryBox" w="50%" p=6)
      StakingWrapper(w="50%" id="territory" :data="territoriesUserData")
  PageSection(section="energyStaking")
  Card(p=0)
    HList()
      PageSection(section="assetStaking.energyBox" w="50%" p=6)
      StakingWrapper(w="50%" id="energy" :data="energyData")
  PageSection(section="landmarkStaking")
  Card(p=0)
    HList()
      PageSection(section="assetStaking.landmarkBox" w="50%" p=6)
      StakingWrapper(w="50%" id="landmark" :data="landmarkData")
  PageSection(section="metashareStaking")
  Card(p=0)
    HList()
      PageSection(section="assetStaking.metashareBox" w="50%" p=6)
      StakingWrapper(w="50%" id="metashare" :data="metashareData")
</template>

<style></style>


<script lang="ts" setup>
import { StakingId } from '../.nuxt/gql/default';
import IXTIcon from '../public/assets/svg/tokenBG.svg'


const { data: territoriesUserData } = useStakingData(StakingId.TerritoriesUser)
const { data: metashareData } = useStakingData(StakingId.Metashare)
const { data: energyData } = useStakingData(StakingId.Energy)
const { data: landmarkData } = useStakingData(StakingId.Landmark)

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