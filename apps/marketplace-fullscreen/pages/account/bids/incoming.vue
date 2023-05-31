<template lang="pug">
Collection(:data="data" :columns="columns" :context="'incoming-bids'" v-if="data" :hide-grid="true")
  template(#menu)
    AccountMenu()
</template>
    
    
<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";
import { fromUnixTime } from "date-fns"


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
  { label: "Asset", columnId: "name" },
  {
    label: "Price", columnId: "bid.price", getValue(row) {
      return row.bid.price
    }, type: 'ixt', sortable: true
  },
  { label: "USD price", columnId: "usd", type: 'usd', sortable: true },
  {
    label: "Floor Difference", columnId: "floor", getValue(row) {
      if (row.lowest_sale?.price)
        return (row.higher_bid_price - row.lowest_sale.price).toString().substring(0, 5)
      return row.higher_bid_price.toString()
    }, type: 'text'
  },
  {
    label: "Quantity", columnId: "bid.quantity", getValue(row) {
      return row.bid.quantity.toString()
    }, type: 'text'
  },
  {
    label: "From", columnId: "bid.bidder_username", getValue(row) {
      return row.bid.bidder_username
    }, type: 'text'
  },
  {
    label: "Expires", columnId: "bid.due_date", getValue(row) {
      return row.bid.due_date
    }, type: 'date', sortable: true
  },
  {
    type: 'buttons', buttons: [{
      type: 'secondary', text: 'counter', onClick: (token) => {
        counterBidOnClick(token)
      },
    },
    {
      type: 'primary', text: 'accept', onClick: (token) => {
        acceptBidOnClick(token)
      },
    }]
  },

]

const counterBidOnClick = (token: IXToken) => {
  console.log("Counter", token)
  console.log(data.value?.nfts)
}

const acceptBidOnClick = (token: IXToken) => {
  console.log("Accept", token)
}
</script>