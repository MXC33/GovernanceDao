<template lang="pug">
PageSection(section="territoryStaking")
  CardTerritory()
    HList()
      img.icon(src="~/assets/png/mocked-area-img.png")
      PageSection( section="assetStaking.territoryBox" w="50%" p=6)
      StakingWrapper(w="50%" id="territory" :data="territoriesUserData")
  PageSection(section="energyStaking")
    CardTerritory()
      HList()
        img.icon(src="~/assets/png/EnergyIcon.png")
        PageSection(section="assetStaking.energyBox" w="50%" p=6)
        StakingWrapper(w="50%" id="energy" :data="energyData")
    PageSection(section="landmarkStaking")
    CardTerritory()
      HList()
        img.icon(src="~/assets/png/landmarkFinal.png")
        PageSection(section="assetStaking.landmarkBox" w="50%" p=6)
        StakingWrapper(w="50%" id="landmark" :data="landmarkData")
    PageSection(section="metashareStaking")
    CardTerritory()
      HList()
        img.icon(src="~/assets/png/newlands.png")
        PageSection(section="assetStaking.metashareBox" w="50%" p=6)
        StakingWrapper(w="50%" id="metashare" :data="metashareData")
</template>

<script lang="ts" setup>

import { StakingId } from '~/.nuxt/gql/default';

const { data: territoriesUserData } = useStakingData(StakingId.TerritoriesUser)
const { data: metashareData } = useStakingData(StakingId.Metashare)
const { data: energyData } = useStakingData(StakingId.Energy)
const { data: landmarkData } = useStakingData(StakingId.Landmark)

</script>

<style>
.icon {
  width: 80px;
  height: 90px;
  margin-right: 0px;
  opacity: 0.9;
  filter: brightness(90%);
  margin-top: 25px;
  margin-bottom: 20px;
  margin-left: 20px;
}
</style>