<template lang="pug">
Collection(:data="data" :columns="columns" context="outgoing-bids" v-if="data" :hide-grid="true" :loading="pending" @load-next-page="loadNextPage")
  template(#menu)
    AccountMenu()
</template>


<script lang="ts" setup>
import type { TableColumn } from "~/composables/useTable";
import type { IXToken } from "@ix/base/composables/Token/useIXToken";

const { displayPopup } = usePopups()

const { myAssetsURL } = useCollectionsURL()
const { t } = useI18n()

const { data: data, execute: fetchCollection, loadNextPage, setupCollectionListeners, refresh: refresh, pending } = useCollectionData(myAssetsURL('polygon'), {
  filter: {
    owned: true,
    type: 2,
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
  title: decodeHtmlCharCodes(t('marketplace.pages.account.bid.outgoing.meta_title'))
})

const columns: TableColumn<IXToken>[] = [
  { label: t('marketplace.pages.account.bid.outgoing.asset'), type: "asset", width: 200 },
  {
    label: t('marketplace.pages.account.bid.outgoing.offerPrice'), rowKey: "bid.price", type: 'ixt', sortable: true
  },
  { label: t('marketplace.pages.account.bid.outgoing.usdPrice'), rowKey: "bid.price", type: 'usd', sortable: true, hideMobile: true },
  {
    label: t('marketplace.pages.account.bid.outgoing.floorDifference'), rowKey: "floor", getValue(row) {
      if (row.lowest_sale?.price)
        return (row.higher_bid_price - row.bid.price).toString().substring(0, 5)
      return row.higher_bid_price.toString()
    }, type: 'text'
  },
  {
    label: t('marketplace.pages.account.bid.outgoing.quantity'), rowKey: "bid.quantity", type: 'text'
  },
  {
    label: t('marketplace.pages.account.bid.outgoing.expiration'), rowKey: "bid.due_date", type: 'date', sortable: true
  },
  {
    label: t('marketplace.pages.account.bid.outgoing.offerMade'), rowKey: "offer_made", getValue(row) {
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
