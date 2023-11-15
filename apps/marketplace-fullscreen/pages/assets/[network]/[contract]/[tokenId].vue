<template lang="pug">
CollectionSingleItem(:item="singleItem" v-if="singleItem")
</template>


<script lang="ts" setup>
const route = useRoute()
const { network, tokenId, contract } = route.params
const { t } = useI18n()

const { data: singleItem, execute: fetchToken } = await useAssetAPI({
  contract: String(contract),
  network: String(network),
  tokenId: String(tokenId)
})

await fetchToken()


const decodeHtmlCharCodes = (str) => {
  return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
    return String.fromCharCode(charCode);
  });
}

useHead({
  title: (singleItem.value?.name ? singleItem.value.name + " | " : "") + decodeHtmlCharCodes(t('marketplace.pages.assets.network.contract.tokenId.meta_title'))
})
</script>
