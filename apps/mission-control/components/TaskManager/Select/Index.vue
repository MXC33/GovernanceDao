<template lang="pug">
ListContainer()
  ListSection()
    VList(space-y="2" mt="2")
      InfoSummary()
        template(#header) Proxy Message
        template(#default) Browse through the corporations to check your orders, products and tech progress, and claim your assets.

    VList(space-y="2")
      template(v-for="corporation in corporations")
        TaskManagerSelectItem(:corporation="corporation")

</template>

<script setup lang="ts">
import type { Corporation } from '~~/composables/corporations/useCorporations';
const { execute: fetchGWS } = useGWSData()
const { execute: fetchFacilityUpgradeData } = useFacilityUpgradeData()
const { execute: fetchNewLandsInfo } = useNewlandsData()
const { execute: fetchNewlandsUpgrade } = useFacilityUpgradeData()
const { execute: fetchEternaLabsInfo } = useEternalabData()
const { execute: fetchMetaModFusionData } = useMetamodFusionData()


const corporations: Corporation[] = ['eternalab', 'gws', 'new-lands', 'y-space']

await Promise.all([
  fetchGWS(),
  fetchNewlandsUpgrade(),
  fetchNewLandsInfo(),
  fetchEternaLabsInfo(),
  fetchFacilityUpgradeData(),
  fetchMetaModFusionData()
])

</script>
