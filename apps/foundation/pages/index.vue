<template lang="pug">
Page()
  PageSection(section="dashboardStaking" :primary="true")
  HList(grid="~ gap-6")
    router-link(to="/territories" tag="button" btn="~ secondary") Territories Staking
    router-link(to="/energy" tag="button" btn="~ secondary") Energy Staking
    router-link(to="/landmarks" tag="button" btn="~ secondary") Landmarks Staking
    router-link(to="/metashare" tag="button" btn="~ secondary") MetaShare Staking
    router-link(to="/governance" tag="button" btn="~ secondary") Governance  

  div(grid="~ cols-2 gap-6")
    VList(gap-50)
      VList(text="xl left")
        h3(color="gray") Stake IXT, earn up to
        h1(text="bold 5xl" color="#84D4BC") 18,88% APY
        HList(gap-6)
          button(color="gray") Buy IXT 
          button(color="gray") Add IXT to wallet 
      CardChart()
    VList(space-y="15") 
      TableDashboard()
      div(grid="~ cols-2 gap-6")
        Card() 
          TitleDetail(flex-col-reverse)
            h3() Circulating Supply
            h4(color="orange") See on coinGecko
            template(#detail)
              h4() Total pool next epoch
            h4() 422,681
        Card()
          TitleDetail(flex-col-reverse)
            h3() Distribution today
            h4() 36,936.63 (ICON) 

  PageSection(section="earnStaking")
    div(grid="~ cols-2" gap="6")
      Card()
        TitleDetail()
          template(#normal)
            PageSection(section="ixtStakingInfo")
        template(#detailRight)
          IXTIcon(w="25" class="ml-2")
      Card()
        TitleDetail()
          template(#normal)
            PageSection(section="lpStakingInfo")
        template(#detailRight )
          UsdtIXT_Icon(w="25" class="ml-2")
          MaticIXT_Icon(w="25" class="ml-2")


  PageSection(section="ixtStaking")
  Stake()


  //- PageSection(section="ixtStaking")
  //-   div(grid="~ cols-4 gap-6")
  //-     Card(v-for="item in list" )
  //-       div(grid="~ cols-2 gap-6")
  //-         TitleDetail()
  //-           template(#detail) Locking Period 
  //-           template(#default) {{ item.lockingPeriod }} months
  //-         TitleDetail()
  //-           template(#detail) Multiplier
  //-           template(#default) {{ item.multiplier }} x

  //-     Card(grid="col-span-2")
  //-       h3 Reward Pool

  //-     CardDotted(grid="col-span-2")
  //-       h3 Coming Soon 
  //-       HList()
  //-         button(btn="~ secondary") LEARN MORE

  //-     button(btn="~ primary") CONNECT WALLET TO STAKE

  PageSection(section="territoryStaking")
  Card()
    HList()
      // TerritoryICON(w="20" class="ml2")
      PageSection( section="assetStaking.territoryBox" w="50%")
      StakingWrapper(w="50%" id="territory" :data="territoriesUserData" bg="black")
  PageSection(section="energyStaking")
  Card()
    HList()
      // EnergyIcon(w="20" class="ml2")
      PageSection(section="assetStaking.energyBox" w="50%")
      StakingWrapper(w="50%" id="energy" :data="energyData")
  PageSection(section="landmarkStaking")
  Card()
    HList()
      // LandmarkIcon(w="20" class="ml2")
      PageSection(section="assetStaking.landmarkBox" w="50%" p=6)
      StakingWrapper(w="50%" id="landmark" :data="landmarkData")
  PageSection(section="metashareStaking")
  Card()
    HList()
      // NewlandsIcon(w="20" class="ml2")
      PageSection(section="assetStaking.metashareBox" w="50%" p=6)
      StakingWrapper(w="50%" id="metashare" :data="metashareData")
</template>




<style></style>


<script lang="ts" setup>
import { StakingId } from '../.nuxt/gql/default';
import IXTIcon from '../public/assets/svg/tokenBG.svg'
import MaticIXT_Icon from '../public/assets/svg/matic_ix.svg'
import UsdtIXT_Icon from '../public/assets/svg/usdt_ix.svg'
import TerritoryICON from '../public/assets/png/mocked-area-img.png'
import LandmarkIcon from '../public/assets/landmarkSmall.png'
import NewlandsIcon from '../public/assets/png/newlands.png'
import EnergyIcon from '../public/assets/svg/EnergySmall.svg'

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


</script>