<template lang="pug">
Collection(:data="data" :columns="columns" v-if="data" :hide-grid="true")
  template(#menu)
    AccountMenu()
</template>
    
    
<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";


const { myAssetsURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, setupCollectionListeners } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 1,
  }
})

await fetchCollection()
setupCollectionListeners()

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

const counterBidOnClick = (token: IXToken) => {
  console.log("Counter", token)
}

const acceptBidOnClick = (token: IXToken) => {
  console.log("Accept", token)
}
</script>