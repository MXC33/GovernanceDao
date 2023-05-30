<template lang="pug">
Collection(:data="data" :columns="columns" v-if="data" :hide-grid="true")
  template(#menu)
    AccountMenu()
</template>
    
    
<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";
import { formatDuration, fromUnixTime } from "date-fns"


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
  {
    label: "Price", value: "bid", getValue(row) {
      return row.bid.price.toString()
    }, type: 'text', sortable: true
  },
  { label: "USD price", value: "usd", type: 'usd', sortable: true },
  {
    label: "Floor Difference", value: "bid", getValue(row) {
      if (row.lowest_sale?.price)
        return (row.higher_bid_price - row.lowest_sale.price).toString().substring(0, 5)
      return row.higher_bid_price.toString()
    }, type: 'text', sortable: true
  },
  {
    label: "Quantity", value: "bid", getValue(row) {
      return row.bid.quantity.toString()
    }, type: 'text'
  },
  {
    label: "From", value: "bidder_username", getValue(row) {
      return row.bid.bidder_username
    }, type: 'text'
  },
  {
    label: "Expires", value: "due_date", getValue(row) {
      return fromUnixTime(row.bid.due_date).toDateString()
    }, type: 'text', sortable: true
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

const formattedDays = (days: number) => formatDuration({ days }, { format: ['months', 'weeks', 'days'] })


const counterBidOnClick = (token: IXToken) => {
  console.log("Counter", token)
  console.log(data.value?.nfts)
}

const acceptBidOnClick = (token: IXToken) => {
  console.log("Accept", token)
}
</script>