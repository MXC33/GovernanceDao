<template lang="pug">
CorporationPage(@click-back="onExit")
  template(#title)
    TitleWithPointer
      template(#default) {{ $t(`corporations.haveblue.overview.header`) }}

  template(#default)
    CorporationOverview()
      CorporationButton(page="shop")

  template(#buttonBack) {{ $t(`general.exit`) }}

</template>

<script lang="ts" setup>
const { execute: fetchPlayerBaseLevel } = usePlayerBaseLevelData()


await fetchPlayerBaseLevel()

const { execute: fetchTokens } = useTokenData()
const { execute: fetchBaseLevelCapacity } = useBaseLevelCapacityData()

await Promise.all([
  fetchTokens(),
  fetchBaseLevelCapacity()
])


const onExit = () => {
  navigateTo('/mission-control')
}

</script>
