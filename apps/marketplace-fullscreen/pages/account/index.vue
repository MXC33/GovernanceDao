<template lang="pug">
Collection(:data="data" v-if="data")
  template(#menu)
    AccountMenu()
</template>
  
  
<script lang="ts" setup>

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