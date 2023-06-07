<template lang="pug">
Collection(:data="data" v-if="data" :context="'my-assets'")
  template(#menu)
    AccountMenu()
</template>


<script lang="ts" setup>

useHead({
  title: "My Assets | Marketplace | PlanetIX"
})
const { myAssetsURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, setupCollectionListeners } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 0,
  }
})

await fetchCollection()
setupCollectionListeners()

</script>
