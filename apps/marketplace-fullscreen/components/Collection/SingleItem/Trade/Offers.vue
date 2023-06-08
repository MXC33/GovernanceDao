<template lang="pug">
ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900")
  template(#titleicon)
    TitleWithIcon(icon="offer") offers

  template(#default)
    CollectionSingleItemTradeDetail(v-if="item.my_shares == 0") 
      | You do not own this asset

    CollectionSingleItemTradeDetail(v-if="item.bids.length < 1" ) 
      | There is no offers for this item

    Table(:columns="offerColumns" :rows="item.bids" id="offers" :in-drawer="true" v-else="item.bids.length > 0" :col-width="150")
      template(#item-buttons="{row}" )
        button(@click="onClickAcceptOffer(row)" uppercase="~" bg="gray-500 hover:gray-400" transition="all" cut="bottom-right sm" p="x-6 y-3" font="bold" v-if="!playerOwnedSale(row)") Accept
        button(@click="cancelBidOnClick(row)" uppercase="~" bg="gray-500 hover:gray-400" transition="all" cut="bottom-right sm" p="x-6 y-3" font="bold" v-else) Cancel

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
    { label: "Sale Price", type: "ixt", rowKey: "price", sortable: true },
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
    { label: "Expiration", type: "date", rowKey: "due_date", sortable: true }

  ]
  if (item.my_shares > 0)
    baseColumns.push({ type: 'buttons', width: 140 })

  return baseColumns
})

const playerOwnedSale = (bid: Bid) => {
  const message = JSON.parse(bid.message)
  if (message.body.offerer.toLowerCase() == walletAdress.value?.toLowerCase())
    return true
  return false
}


</script>
