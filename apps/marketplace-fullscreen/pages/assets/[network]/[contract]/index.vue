<template lang="pug">
Collection(:data="data" v-if="data" :loading="pending" @loadNextPage="loadNextPage" context="collection")
  template(#bottom)
</template>


<script lang="ts" setup>
const route = useRoute()
const { contract } = route.params
const { t } = useI18n()

const { getCollectionURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners, pending } = useCollectionData(getCollectionURL(String(contract), 'polygon'))

await fetchCollection()

const decodeHtmlCharCodes = (str) => {
  return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
    return String.fromCharCode(charCode);
  });
}

useHead({
  title: (data.value?.name ? data.value.name + " | " : "") + decodeHtmlCharCodes(t('marketplace.pages.assets.network.contract.tokenId.meta_title'))
})

setupCollectionListeners()

</script>
