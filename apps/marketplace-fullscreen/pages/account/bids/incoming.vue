<template lang="pug">
Collection(:data="data" :columns="columns" v-if="data" :hide-grid="true")
  template(#menu)
    AccountMenu()
</template>
    
    
<script lang="ts" setup>

import { useCollectionSettings } from "~/composables/useCollection";
import type { CollectionPayload } from '~/composables/useCollection';
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";

const body = ref<CollectionPayload>({
  page_key: 0,
  order: 0,
  filter: {
    owned: true,
    type: 1,
    search: "",
    attributes: []
  }
})

const columns: TableColumn<IXToken>[] = [
  { label: "Asset", value: "name" },
  { label: "Current price", value: "sale_price", type: 'ixt', sortable: true },
  { label: "USD price", value: "usd", type: 'usd', sortable: true },
  { label: "Best offer", value: "higher_bid_price", type: 'ixt', sortable: true },
  {
    type: 'buttons', buttons: [{
      type: 'secondary', text: 'counter', onClick: (test) => {
        counterBidOnClick(test)
      },
    },
    {
      type: 'primary', text: 'accept', onClick: (test) => {
        acceptBidOnClick(test)
      },
    }]
  },

]


const { data: data, execute: fetchCollection, refresh: refresh } = usePersonalAssetAPI(body.value)
const { counterBid, acceptBid } = useBidsAPI()

const { activeFilters } = useCollectionSettings()

const createFilters = () => {
  if (data.value)
    activeFilters.value = data.value.filters.map((filter) => ({
      ...filter,
      value: filter.value.map((name) => ({
        name,
        selected: false
      }))
    }))
}



const counterBidOnClick = (token: IXToken) => {
  console.log("Counter", token)
}

const acceptBidOnClick = (token: IXToken) => {
  console.log("Accept", token)
}



watch(() => data, (value) => {
  console.log("data", data.value)
  if (activeFilters.value.length < 1)
    createFilters()
}, { deep: true })


onBeforeUnmount(() => {
  activeFilters.value = []
})
onMounted(() => {
  fetchCollection()
})
</script>