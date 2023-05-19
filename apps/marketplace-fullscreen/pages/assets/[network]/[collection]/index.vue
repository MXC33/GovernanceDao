<template lang="pug">
Collection(:data="collectionData" v-if="collectionData")

</template>


<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const { collection } = route.params

const { data: collectionData, execute: fetchCollection } = useCollectionData(String(collection))

await fetchCollection()

</script>