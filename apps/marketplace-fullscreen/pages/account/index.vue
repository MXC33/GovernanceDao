<template lang="pug">
Collection(:data="data" :columns="columns" v-if="data" context="my-assets" :loading="pending")
  template(#menu)
    AccountMenu()

  template(#bottom)
    HList(w="lt-md:full" justify="center" py="2" v-if="!!data.page_key && Number(data.page_key) > 0")
      button(@click="loadNextPage" btn="~ primary" py="3" cut="bottom-right sm b-ix-primary" bg="hover:ix-ne" w="lt-md:full") {{ $t(`marketplace.navigation.loadMore`)}}
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
  { label: "Asset", rowKey: "name", type: 'asset' },
  { label: "Current price", rowKey: "sale_price", type: 'ixt', sortable: true },
  { label: "USD price", rowKey: "sale_price", type: 'usd', sortable: true },
  { label: "Best offer", rowKey: "higher_bid_price", type: 'ixt', sortable: true },
]

</script>
