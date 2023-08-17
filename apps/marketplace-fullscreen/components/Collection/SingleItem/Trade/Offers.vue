<template lang="pug">
ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900" mx="lt-md:-4" :disable="!hasDrawer" :is-table="true")
  template(#titleicon)
    TitleWithIcon(icon="offer") {{ $t(`marketplace.singleItem.offers`) }}

  template(#default)
    CollectionSingleItemTradeDetail(v-if="item.bids.length < 1") 
      | {{ $t(`marketplace.singleItem.noCurrentBids`) }}

    Table(:columns="offerColumns" :rows="item.bids" id="offers" v-if="item.bids.length > 0")

</template>

<script lang="ts" setup>
import type { SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';

const { t } = useI18n()
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const { displayPopup } = usePopups()
const { walletAdress } = useWallet()

const { isMobile } = useDevice()

const { item } = defineProps<{
  item: SingleItemData,
  hasDrawer?: boolean
}>()

const onClickAcceptOffer = (bid: Bid) => {
  displayPopup({
    type: 'accept-items',
    items: [{
      ...item,
      bid
    }]
  })
}

const cancelBidOnClick = async (bid: Bid) => {
  displayPopup({
    type: 'unbid-item',
    items: [{
      ...item,
      bid
    }]
  })
}

const itemOwned = computed(() => {
  if (item.my_shares == 0) {
    return false
  } else if (item.my_shares > 0)
    return true
})

const offerColumns = computed<TableColumn<Bid>[]>(() => {
  const baseColumns: TableColumn<Bid>[] = [
    { label: "Unit Price", type: "ixt", rowKey: "price", sortable: true },
    { label: "USD Price", type: "usd", rowKey: "price", sortable: true },
    { label: "Quanitity", rowKey: "quantity", sortable: true, width: 'auto' },
    {
      label: "Floor Difference", rowKey: "price", getValue(row) {
        if (item.sale_price == 0)
          return 'No sale exist'

        const difference = roundToDecimals(
          ((row.price * 100) / item.sale_price) - 100
          , 2)
        return Math.abs(difference) + '% ' + (difference < 0 ? 'below' : 'above')
      }, sortable: true
    },
    { label: "Expiration", type: "date", rowKey: "due_date", sortable: true },
  ]

  if (itemOwned.value) {
    baseColumns.push({
      type: 'buttons',
      width: 'auto',
      buttons: [
        {
          type: 'secondary',
          onClick(row) {
            onClickAcceptOffer(row)
          },
          text: t(`marketplace.singleItem.accept`),
          hidden(row) { return playerOwnedSale(row) || item.my_shares == 0 },
        },
        {
          type: 'secondary',
          onClick(row) {
            cancelBidOnClick(row)
          },
          text: t(`marketplace.singleItem.cancel`),
          hidden(row) { return !playerOwnedSale(row) },
        }
      ]
    })
  }
  return baseColumns
})

const playerOwnedSale = (bid: Bid) => {
  const message = JSON.parse(bid.message)
  if (message.body.offerer.toLowerCase() == walletAdress.value?.toLowerCase())
    return true
  return false
}

</script>
