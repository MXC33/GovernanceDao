<template lang="pug">
CorporationPage(@click-back="onExit")
  template(#title)
    TitleWithPointer
      template(#default) {{ $t(`corporations.y-space.overview.header`) }}

  template(#default)
    CorporationOverview()
      CorporationButton(page="shop")
      CorporationButton(page="service")
      CorporationButton(page="stake-burn")

  template(#buttonBack) {{ $t(`general.exit`) }}

</template>

<script lang="ts" setup>
const { execute: fetchPlayerBaseLevel } = usePlayerBaseLevelData()

await fetchPlayerBaseLevel()

// const { execute: fetchEternaLabsInfo } = useEternalabData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchBaseLevelCapacity } = useBaseLevelCapacityData()

await Promise.all([
  // fetchEternaLabsInfo(),
  fetchTokens(),
  fetchBaseLevelCapacity()
])

const onExit = () => {
  navigateTo('/mission-control')
}

</script>
