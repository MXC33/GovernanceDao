<template lang="pug">
ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900")
  template(#titleicon)
    TitleWithIcon(icon="offer") {{ $t(`marketplace.singleItem.offers`) }}

  template(#default)
    CollectionSingleItemTradeDetail(v-if="item.my_shares == 0") 
      | {{ $t(`marketplace.singleItem.doNotOwn`) }}

    CollectionSingleItemTradeDetail(v-if="item.bids.length < 1" ) 
      | {{ $t(`marketplace.singleItem.noOffers`) }}

    Table(v-if="item.bids.length > 0" :columns="offerColumns" :rows="item.bids" id="offers" :col-width="150")
      template(#item-buttons="{row}" )
        TableButtonSmall(@click="onClickAcceptOffer(row)"  v-if="!playerOwnedSale(row)") {{ $t(`marketplace.singleItem.accept`) }}
        TableButtonSmall(@click="cancelBidOnClick(row)" v-else) {{ $t(`marketplace.singleItem.cancel`) }}

</template>

<script lang="ts" setup>
import type { SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';
const { displayPopup } = usePopups()
const { walletAdress } = useWallet()

const isMobile = onMobile()

const { item } = defineProps<{
  item: SingleItemData
}>()

const onClickAcceptOffer = (bid: Bid) => {
  displayPopup({
    type: 'accept-item',
    item: {
      ...item,
      bid
    }
  })
}

const cancelBidOnClick = async (bid: Bid) => {
  displayPopup({
    type: 'unbid-item',
    item: {
      ...item,
      bid
    }
  })
}

const offerColumns = computed<TableColumn<Bid>[]>(() => {
  const baseColumns: TableColumn<Bid>[] = [
    { label: "Unit Price", type: "ixt", rowKey: "price", sortable: true },
    { label: "USD Price", type: "usd", rowKey: "price", sortable: true },
    { label: "Quanitity", rowKey: "quantity", sortable: true },
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
    {
      type: 'buttons', buttons: [{
        type: 'secondary', onClick: (token) => {
          onClickAcceptOffer(token)
        },
      },
      {
        type: 'primary', onClick: (token) => {
          cancelBidOnClick(token)
        },
      }]
    },
  ]

  return baseColumns
})

const playerOwnedSale = (bid: Bid) => {
  const message = JSON.parse(bid.message)
  if (message.body.offerer.toLowerCase() == walletAdress.value?.toLowerCase())
    return true
  return false
}


</script>
