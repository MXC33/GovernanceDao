<template lang="pug">
Collection(:data="splitSales" :columns="columns" :context="'active-listings'" v-if="data" :hide-grid="true")
  template(#menu)
    AccountMenu()

</template>
    
    
<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";
import type { CollectionData } from "~/composables/useCollection";

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
  { label: "Asset", rowKey: "name" },
  {
    label: "Unit price", rowKey: "sales[0].price", type: 'ixt', sortable: true
  },
  { label: "USD price", rowKey: "sales[0].price", type: 'usd', sortable: true },
  {
    label: "Floor Difference", rowKey: "floor", getValue(row) {
      if (row.lowest_sale?.price)
        return (row.higher_bid_price - row.lowest_sale.price).toString().substring(0, 5)
      return row.higher_bid_price.toString()
    }, type: 'text'
  },
  {
    label: "Expiration date", rowKey: "sales[0].endtime", type: 'date', sortable: true
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

const splitSales = computed<CollectionData | undefined>(() => {
  if (!data.value)
    return undefined
  const newData = { ...data.value }

  newData.nfts = newData.nfts.flatMap(nft => {
    if (!nft.sales || nft.sales.length === 0)
      return nft

    return nft.sales.map(sale => {
      const newNft = { ...nft }
      newNft.sales = [sale]
      return newNft
    })
  })

  return newData
})

const { removeBid, placeBid } = useBidsAPI()

const cancelBidOnClick = (token: IXToken) => {
  console.log("Cancel", token)
}

const updateBidOnClick = (token: IXToken) => {
  console.log("Update", token)
}

</script>