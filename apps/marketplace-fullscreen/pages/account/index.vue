<template lang="pug">
Collection(:data="data" v-if="data" context="my-assets" :loading="pending")
  template(#menu)
    AccountMenu()

  template(#bottom)
    HList(w="lt-md:full" justify="center" py="2" v-if="!!data.page_key && data.page_key > 0")
      button(@click="loadNextPage" btn="~ primary" py="3" cut="bottom-right sm b-ix-primary" bg="hover:ix-ne" w="lt-md:full") Load More
</template>


<script lang="ts" setup>

useHead({
  title: "My Assets | Marketplace | PlanetIX"
})
const { myAssetsURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners, pending } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 0,
  }
})

await fetchCollection()
setupCollectionListeners()

</script>
