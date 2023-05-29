<template lang="pug">
Collection(:data="data" v-if="data" )
button(@click="loadMore") LoadMore
</template>


<script lang="ts" setup>

import { type FilterPayload, useCollectionSettings } from "~/composables/useCollection";
import type { CollectionPayload } from '~/composables/useCollection';

const { activePage, collectionBody, setupCollectionListeners } = useCollectionSettings()

const route = useRoute()
const { contract } = route.params

const { data: data, execute: fetchCollection, fetchAndMerge: fetchNewPage, refresh: refresh } = useCollectionData(String(contract), collectionBody)

const loadMore = () => {
  activePage.value = Number(data.value?.page_key)
  fetchNewPage()
}

await fetchCollection()


</script>