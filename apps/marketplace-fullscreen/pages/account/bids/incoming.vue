<template lang="pug">
Collection(:data="data" :columns="columns" :context="'incoming-bids'" v-if="data" :hide-grid="true")
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
  { label: "Asset", rowKey: "name" },
  {
    label: "Highest bid", rowKey: "bid.price", type: 'ixt', sortable: true
  },
  {
    label: "USD price", rowKey: "bid.price", type: 'usd', sortable: true
  },
  {
    label: "Floor Difference", rowKey: "price", getValue(row) {
      if (row.sale_price == 0)
        return 'No sale exist'
      const difference = roundToDecimals(
        ((row.higher_bid_price * 100) / row.sale_price) - 100
        , 2)
      return Math.abs(difference) + '% ' + (difference < 0 ? 'below' : 'above')
    }, type: 'text'
  },
  {
    label: "Quantity", rowKey: "bid.quantity", type: 'text'
  },
  {
    label: "From", rowKey: "bid.bidder_username", type: 'text'
  },
  {
    label: "Expires", rowKey: "bid.due_date", type: 'date', sortable: true
  },
  {
    type: 'buttons', buttons: [
      //   {
      //   type: 'secondary', text: 'counter', onClick: (token) => {
      //     counterBidOnClick(token)
      //   },
      // },
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

const { displayPopup } = usePopups()

const acceptBidOnClick = (token: IXToken) => {
  displayPopup({
    type: 'accept-item',
    item: token
  })
}
</script>
