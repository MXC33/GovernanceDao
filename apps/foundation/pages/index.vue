<template lang="pug">
Page()
  HList(grid="~ gap-6")
    router-link(to="/territories" tag="button" btn="~ secondary") Territories Staking
    router-link(to="/energy" tag="button" btn="~ secondary") Energy Staking
    router-link(to="/landmarks" tag="button" btn="~ secondary") Landmarks Staking
    router-link(to="/metashare" tag="button" btn="~ secondary") MetaShare Staking
    router-link(to="/governance" tag="button" btn="~ secondary") Governance 
  PageSection(section="dashboardStaking" :primary="true")
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


</script>