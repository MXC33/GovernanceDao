<template lang="pug">
Collection(:data="data" v-if="data" :loading="pending")
  template(#bottom)
    HList(w="lt-md:full" justify="center" py="2")
      button(@click="loadNextPage" btn="~ primary" py="3" cut="bottom-right sm b-ix-primary" bg="hover:ix-ne" w="lt-md:full") Load More
</template>


<script lang="ts" setup>
const route = useRoute()
const { contract } = route.params

const { getCollectionURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners, pending } = useCollectionData(getCollectionURL(String(contract), 'polygon'))

watch(pending, () => {
  console.log("PENDING", pending.value)
})

await fetchCollection()
setupCollectionListeners()

</script>