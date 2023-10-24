<template lang="pug">
PageSection(section="assetStaking")
  HomepageAssetItem(:data="territoriesUserData" id="territory")
  HomepageAssetItem(:data="energyData" id="energy")
  HomepageAssetItem(:data="landmarkData" id="landmark")
  HomepageAssetItem(:data="metashareData" id="metashare")
</template>

<script lang="ts" setup>

import { StakingId } from '~/.nuxt/gql/default';

const { data: territoriesUserData } = useStakingData(StakingId.TerritoriesUser)
const { data: metashareData } = useStakingData(StakingId.Metashare)
const { data: energyData } = useStakingData(StakingId.Energy)
const { data: landmarkData } = useStakingData(StakingId.Landmark)

</script>

