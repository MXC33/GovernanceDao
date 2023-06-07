<template lang="pug">
Collection(:data="data" v-if="data" context="my-assets" :loading="pending")
  template(#menu)
    AccountMenu()
</template>
  
  
<script lang="ts" setup>

const { myAssetsURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, setupCollectionListeners, pending } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 0,
  }
})

await fetchCollection()
setupCollectionListeners()

</script>