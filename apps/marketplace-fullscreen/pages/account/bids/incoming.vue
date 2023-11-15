<template lang="pug">
Collection(:data="data" :columns="columns" context="incoming-bids" :loading="pending" v-if="data" :hide-grid="true" @load-next-page="loadNextPage")
  template(#menu)
    AccountMenu()
</template>


<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";

const { myAssetsURL } = useCollectionsURL()
const { t } = useI18n()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners, pending } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 1,
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
  title: decodeHtmlCharCodes(t('marketplace.pages.account.bid.incoming.meta_title'))
})


const columns: TableColumn<IXToken>[] = [
  { label: t('marketplace.pages.account.bid.incoming.asset'), type: 'asset', width: 250 },
  {
    label: t('marketplace.pages.account.bid.incoming.highestBid'), rowKey: "bid.price", type: 'ixt', sortable: true
  },
  {
    label: t('marketplace.pages.account.bid.incoming.usdPrice'), rowKey: "bid.price", type: 'usd', sortable: true, hideMobile: true
  },
  {
    label: t('marketplace.pages.account.bid.incoming.floorDifference') , rowKey: "price", getValue(row) {
      if (row.sale_price == 0)
        return t('marketplace.pages.account.bid.incoming.noSaleExist')
      const difference = roundToDecimals(
        ((row.higher_bid_price * 100) / row.sale_price) - 100
        , 2)
      return Math.abs(difference) + '% ' + (difference < 0 ? 'below' : 'above')
    }, type: 'text'
  },
  {
    label: t('marketplace.pages.account.bid.incoming.quantity'), rowKey: "bid.quantity", type: 'text'
  },
  {
    label: t('marketplace.pages.account.bid.incoming.from'), rowKey: "bid.bidder_username", type: 'text'
  },
  {
    label: t('marketplace.pages.account.bid.incoming.expires'), rowKey: "bid.due_date", type: 'date', sortable: true
  },
  {
    width: 'auto',
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

// const counterBidOnClick = (token: IXToken) => {
//   console.log("Counter", token)
//   console.log(data.value?.nfts)
// }

const { displayPopup } = usePopups()

const acceptBidOnClick = (token: IXToken) => {
  displayPopup({
    type: 'accept-items',
    items: [token]
  })
}
</script>
