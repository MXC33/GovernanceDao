<template lang="pug">
Collection(:data="splitSales" :columns="columns" :context="'active-listings'" v-if="data" :hide-grid="true" :loading="pending")
  template(#menu)
    AccountMenu()

</template>


<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";
import type { CollectionData } from "~/composables/useCollection";

const { myAssetsURL } = useCollectionsURL()
const { t } = useI18n()

const { data: data, execute: fetchCollection, setupCollectionListeners, pending } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 3,
  }
})

await fetchCollection()
setupCollectionListeners()

const decodeHtmlCharCodes = (str) => {
  return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
    return String.fromCharCode(charCode);
  });
}
useHead({
  title: decodeHtmlCharCodes(t('marketplace.pages.account.activeListings.meta_title'))
})

const columns: TableColumn<IXToken>[] = [
  { label: t('marketplace.pages.account.activeListings.asset'), type: "asset", width: 200 },

  {
    label: t('marketplace.pages.account.activeListings.unitPrice'), rowKey: "sales[0].price", type: 'ixt', sortable: true
  },
  { label: t('marketplace.pages.account.activeListings.usdPrice'), rowKey: "sales[0].price", type: 'usd', sortable: true },
  {
    label: t('marketplace.pages.account.activeListings.quantity'), rowKey: "sales[0].quantity", type: 'text'
  },
  {
    label: t('marketplace.pages.account.activeListings.floorDifference'), rowKey: "floor", getValue(row) {
      if (row.lowest_sale.price == 0)
        return 'No sale exist'
      const difference = roundToDecimals(
        ((row.sales[0].price * 100) / row.lowest_sale.price) - 100
        , 2)
      return Math.abs(difference) + '% ' + (difference < 0 ? 'below' : 'above')
    }, type: 'text'
  },
  {
    label: t('marketplace.pages.account.activeListings.expirationDate'), rowKey: "sales[0].endtime", type: 'date', sortable: true
  },
  {
    type: 'buttons',
    width: 'auto',
    buttons: [{
      type: 'secondary', text: 'cancel', onClick: (token) => {
        cancelListingOnClick(token)
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
const { displayPopup } = usePopups()


const cancelListingOnClick = async (item: IXToken) => {
  const sale = item.sales[0]
  displayPopup({
    type: 'unlist-item',
    items: [{
      ...item,
      sale: sale
    }]
  })
}

const updateBidOnClick = (token: IXToken) => {
  displayPopup({
    type: 'list-item',
    items: [{
      ...token,
      updating: true
    }]
  })
}

</script>
