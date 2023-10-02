<template lang="pug">
CorporationNewlands()

//- Overlays
</template>

<script lang="ts" setup>
// const { execute: fetchPlayerBaseLevel } = usePlayerBaseLevelData()
// const { execute: fetchNewLandsInfo } = useNewlandsData()
// const { execute: fetchTokens } = useTokenData()

const { resetShopItem } = useCorporationShop()

resetShopItem()

definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

// await Promise.all([
//   fetchNewLandsInfo(),
//   fetchTokens(),
//   fetchPlayerBaseLevel()
// ])

</script>