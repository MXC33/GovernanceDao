<template lang="pug">
Collection(:data="data" :columns="columns" context="outgoing-bids" v-if="data" :hide-grid="true" :loading="pending" @load-next-page="loadNextPage")
  template(#menu)
    AccountMenu()
</template>


<script lang="ts" setup>
useHead({
  title: "Outgoing bids | Marketplace | PlanetIX"
})
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";

const { displayPopup } = usePopups()

const { myAssetsURL } = useCollectionsURL()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners, refresh: refresh, pending } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 2,
  }
})

await fetchCollection()
setupCollectionListeners()

const columns: TableColumn<IXToken>[] = [
  { label: "Asset", type: "asset", width: 200 },
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
    label: "Quantity", rowKey: "bid.quantity", type: 'text', width: 'auto'
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
    type: 'buttons',
    width: 'auto',
    buttons: [{
      type: 'secondary', text: 'remove bid', onClick: (token) => {
        cancelBidOnClick(token)
      },
    },
    {
      type: 'primary', text: 'update bid', onClick: (token) => {
        updateBidOnClick(token)
      },
    }]
  },

]

const getStartDateFromMessage = (row: IXToken) => {
  const message = JSON.parse(row.bid.message)

  return message.body.startTime
}

const cancelBidOnClick = async (item: IXToken) => {
  const bid = item.bid

  displayPopup({
    type: 'unbid-item',
    items: [{
      ...item,
      bid
    }]
  })
}

const updateBidOnClick = async (token: IXToken) => {
  displayPopup({
    type: 'bid-item',
    items: [{
      ...token,
      updating: true
    }]
  })
  await refresh()
}

</script>
