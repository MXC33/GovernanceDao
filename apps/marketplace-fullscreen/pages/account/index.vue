<template lang="pug">
Collection(:data="data" :columns="columns" v-if="data" context="my-assets" :loading="pending" @load-next-page="loadNextPage")
  template(#menu)
    AccountMenu()
</template>


<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";

useHead({
  title: "My Assets | Marketplace | PlanetIX"
})
const { myAssetsURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners, pending } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 0,
  }
})

await fetchCollection()
setupCollectionListeners()

const columns: TableColumn<IXToken>[] = [
  { label: "Asset", type: 'asset', width: 200 },
  { label: "Current price", rowKey: "sale_price", type: 'ixt', sortable: true },
  { label: "USD price", rowKey: "sale_price", type: 'usd', sortable: true },
  { label: "Best offer", rowKey: "higher_bid_price", type: 'ixt', sortable: true },
]

</script>
