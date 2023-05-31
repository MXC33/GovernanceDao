<template lang="pug">
Collection(:data="data" v-if="data" )
button(@click="loadNextPage") LoadMore
</template>


<script lang="ts" setup>
const route = useRoute()
const { contract } = route.params

const { getCollectionURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners } = useCollectionData(getCollectionURL(String(contract), 'polygon'))

await fetchCollection()
setupCollectionListeners()


</script>