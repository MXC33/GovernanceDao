<template lang="pug">
CorporationPage(@click-back="onExit")
  template(#title)
    TitleWithPointer(display="lt-md:none")
      template(#default) {{ $t(`corporations.gws.overview.header`) }}
    TitleWithPointer(display="md:none")
      template(#default) {{ $t(`corporations.gws.overview.headerMobile`) }}

  template(#default)
    CorporationOverview()
      CorporationButton(page="waste-management" icon="craft-boxes")
      CorporationButton(page="shop")

  template(#buttonBack) {{ $t(`general.exit`) }}
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

const { resetShopItem } = useCorporationShop()

resetShopItem()

const { execute: fetchPlayerBaseLevel } = usePlayerBaseLevelData()

await fetchPlayerBaseLevel()

const { execute: fetchGWS } = useGWSData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchBaseLevelCapacity } = useBaseLevelCapacityData()

await Promise.all([
  fetchGWS(),
  fetchTokens(),
  fetchBaseLevelCapacity()
])

const onExit = () => {
  navigateTo('/mission-control')
}

</script>