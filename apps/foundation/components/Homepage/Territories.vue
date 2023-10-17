<template lang="pug">
PageSection(section="territoryStaking")
  CardTerritory()
    HList()
      TerritoryIcon(w="20" )
      PageSection( section="assetStaking.territoryBox" w="50%" p=6)
      StakingWrapper(w="50%" id="territory" :data="territoriesUserData")
  PageSection(section="energyStaking")
    CardTerritory()
      HList()
        EnergyIcon(w="20" class="ml2")
        PageSection(section="assetStaking.energyBox" w="50%" p=6)
        StakingWrapper(w="50%" id="energy" :data="energyData")
    PageSection(section="landmarkStaking")
    CardTerritory()
      HList()
        LandmarkIcon(w="20" class="ml2")
        PageSection(section="assetStaking.landmarkBox" w="50%" p=6)
        StakingWrapper(w="50%" id="landmark" :data="landmarkData")
    PageSection(section="metashareStaking")
    CardTerritory()
      HList()
        NewlandsIcon(w="20" class="ml2")
        PageSection(section="assetStaking.metashareBox" w="50%" p=6)
        StakingWrapper(w="50%" id="metashare" :data="metashareData")
</template>

<script lang="ts" setup>
import TerritoryIcon from '~/assets/png/mocked-area-img.png'
import EnergyIcon from '~/assets/png/EnergyIcon.png'
import LandmarkIcon from '~/assets/png/landmarkFinal.png'
import NewlandsIcon from '~/assets/png/newlands.png'


import { StakingId } from '~/.nuxt/gql/default';

const { data: territoriesUserData } = useStakingData(StakingId.TerritoriesUser)
const { data: metashareData } = useStakingData(StakingId.Metashare)
const { data: energyData } = useStakingData(StakingId.Energy)
const { data: landmarkData } = useStakingData(StakingId.Landmark)

</script>