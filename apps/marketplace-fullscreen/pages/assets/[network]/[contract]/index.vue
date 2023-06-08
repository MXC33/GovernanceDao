<template lang="pug">
Collection(:data="data" v-if="data" :loading="pending")
  template(#bottom)
    HList(w="lt-md:full" justify="center" py="2" v-if="!!data.page_key && Number(data.page_key) > 0")
      button(@click="loadNextPage" btn="~ primary" py="3" cut="bottom-right sm b-ix-primary" bg="hover:ix-ne" w="lt-md:full") Load More
</template>


<script lang="ts" setup>

const route = useRoute()
const { contract } = route.params

const { getCollectionURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners, pending } = useCollectionData(getCollectionURL(String(contract), 'polygon'))

await fetchCollection()
useHead({
  title: (data.value?.name ? data.value.name + " | " : "") + "Marketplace | PlanetIX"
})
setupCollectionListeners()

</script>
