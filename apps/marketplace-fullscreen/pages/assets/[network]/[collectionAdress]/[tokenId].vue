<template lang="pug">
CollectionSingleItem(:item="singleItem" v-if="singleItem")
</template>


<script lang="ts" setup>
const route = useRoute()
const { collection, network, tokenId, collectionAdress } = route.params

const { data: singleItem, execute: fetchToken } = await useAssetAPI({
  slug: String(collection),
  adress: String(collectionAdress),
  network: String(network),
  tokenId: String(tokenId)
})

await fetchToken()
</script>
