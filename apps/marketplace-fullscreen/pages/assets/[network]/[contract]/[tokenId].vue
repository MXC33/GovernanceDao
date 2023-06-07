<template lang="pug">
CollectionSingleItem(:item="singleItem" v-if="singleItem")
</template>


<script lang="ts" setup>
const route = useRoute()
const { network, tokenId, contract } = route.params

const { data: singleItem, execute: fetchToken } = await useAssetAPI({
  contract: String(contract),
  network: String(network),
  tokenId: String(tokenId)
})

await fetchToken()

useHead({
  title: (singleItem.value?.name ? singleItem.value.name + " | " : "") + "Marketplace | PlanetIX"
})
</script>
