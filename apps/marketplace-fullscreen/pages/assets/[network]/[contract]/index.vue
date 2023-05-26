<template lang="pug">
Collection(:data="data" v-if="data" )
button(@click="loadMore") LoadMore
</template>


<script lang="ts" setup>

import { type FilterPayload, useCollectionSettings } from "~/composables/useCollection";
import type { CollectionPayload } from '~/composables/useCollection';

const { activeFilters, createFilters, filtersAsPayload } = useCollectionSettings()

const route = useRoute()
const { contract } = route.params

const activePage = ref(0)

const body = computed<CollectionPayload>(() => ({
  page_key: activePage.value,
  order: 0,
  filter: {
    owned: false,
    type: 0,
    search: "",
    attributes: filtersAsPayload.value
  }
}))

const { data: data, execute: fetchCollection, fetchAndMerge: fetchNewPage, refresh: refresh } = useCollectionData(String(contract), body)

const loadMore = () => {
  activePage.value = Number(data.value?.page_key)
  fetchNewPage()
}

await fetchCollection()

watch(activeFilters, () => {
  activePage.value = 0
  refresh()
  console.log("New filter")
}, { deep: true })

watch(data, (value) => {
  if (!value)
    return

  if (activeFilters.value.length < 1)
    createFilters(value)

  console.log("NEw data", value.nfts.length)

}, { deep: true, immediate: true })

onBeforeUnmount(() => {
  activeFilters.value = []
})

</script>