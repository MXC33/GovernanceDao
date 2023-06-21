<template lang="pug">
Collection(:data="data" v-if="data" :loading="pending" @loadNextPage="loadNextPage")
  template(#bottom)
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
