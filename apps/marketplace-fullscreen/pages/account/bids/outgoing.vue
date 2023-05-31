<template lang="pug">
Collection(:data="data" :columns="columns" :context="'outgoing-bids'" v-if="data" :hide-grid="true")
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
    type: 2,
  }
})

await fetchCollection()
setupCollectionListeners()

const columns: TableColumn<IXToken>[] = [
  { label: "Asset", rowKey: "name" },
  {
    label: "Offer price", rowKey: "bid.price", type: 'ixt', sortable: true
  },
  { label: "USD price", rowKey: "bid.price", type: 'usd', sortable: true },
  {
    label: "Floor Difference", rowKey: "floor", getValue(row) {
      if (row.lowest_sale?.price)
        return (row.higher_bid_price - row.bid.price).toString().substring(0, 5)
      return row.higher_bid_price.toString()
    }, type: 'text'
  },
  {
    label: "Quantity", rowKey: "bid.quantity", type: 'text'
  },
  {
    label: "Expiration", rowKey: "bid.due_date", type: 'date', sortable: true
  },
  {
    label: "Offer made", rowKey: "offer_made", getValue(row) {
      return getStartDateFromMessage(row)
    }, type: 'date', sortable: true
  },
  {
    type: 'buttons', buttons: [{
      type: 'secondary', text: 'cancel', onClick: (token) => {
        cancelBidOnClick(token)
      },
    },
    {
      type: 'primary', text: 'update', onClick: (token) => {
        updateBidOnClick(token)
      },
    }]
  },

]

const getStartDateFromMessage = (row: IXToken) => {
  const message = JSON.parse(row.bid.message)

  return message.body.startTime
}

const { removeBid, placeBid } = useBidsAPI()

const cancelBidOnClick = (token: IXToken) => {
  console.log("Cancel", token)
}

const updateBidOnClick = (token: IXToken) => {
  console.log("Update", token)
}

</script>