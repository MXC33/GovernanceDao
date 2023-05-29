<template lang="pug">
Collection(:data="data" v-if="data" )
button(@click="loadNextPage") LoadMore
</template>


<script lang="ts" setup>
const route = useRoute()
const { contract } = route.params

const { myAssetsURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, loadNextPage } = useCollectionData(myAssetsURL('polygon'))

await fetchCollection()


</script>