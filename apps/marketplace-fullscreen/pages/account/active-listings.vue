<template lang="pug">
Collection(:data="data" :columns="columns" v-if="data" :hide-grid="true")
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
    type: 3,
  }
})

await fetchCollection()
setupCollectionListeners()

const columns: TableColumn<IXToken>[] = [
  { label: "Asset", value: "name" },
  {
    label: "Unit price", value: "bid", getValue(row) {
      return row.bid.price.toString()
    }, type: 'text', sortable: true
  },
  {
    label: "Floor Difference", value: "bid", getValue(row) {
      if (row.lowest_sale?.price)
        return (row.higher_bid_price - row.lowest_sale.price).toString().substring(0, 5)
      return row.higher_bid_price.toString()
    }, type: 'text', sortable: true
  },
  {
    label: "Expiration date", value: "due_date", getValue(row) {
      return fromUnixTime(row.bid.due_date).toDateString()
    }, type: 'text', sortable: true
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

const { removeBid, placeBid } = useBidsAPI()

const cancelBidOnClick = (token: IXToken) => {
  console.log("Cancel", token)
}

const updateBidOnClick = (token: IXToken) => {
  console.log("Update", token)
}

</script>