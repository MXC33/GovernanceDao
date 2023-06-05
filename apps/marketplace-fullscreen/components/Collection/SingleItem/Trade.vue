<template lang="pug">
VList(space-y="6")
  VList()
    h3(text="3xl" font="bold") {{ item.name }}

    CollectionSingleItemSubHeader()
      template(#default)
        TokenCollection(:token="item" color="ix-ne")

  AttributeList(:attributes="attributes" v-if="item")

  //- Listing(:item="item")

  TradeModule(:item="item")


  ContentDrawer(:start-open="true" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="listing") listings

    template(#default)
      Table(:columns="saleColumns" :rows="item.sales" id="single-item" :in-drawer="true" v-if="item.sales && item.sales.length > 0")
        template(#item-action="{row}")
          button(@click="addSaleToCart(row)" bg="gray-500 hover:gray-400" transition="all" cut="bottom-right sm" p="x-6 y-3" v-if="!playerOwnedSale(row)")
            CartIcon(w="6")
          button(@click="removeListing(row)" bg="gray-500 hover:gray-400" transition="all" cut="bottom-right sm" p="x-6 y-3" v-else)
            TrashIcon(w="6" fill="white")



      HList(v-else px="6" py="6" font="bold" color="gray-400" items="center" justify="center")
        span() No items found

  ContentDrawer(:start-open="true" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="offer") offers
    template(#default)
      HList(px="6" py="6" font="bold" color="gray-400" items="center" justify="center" v-if="item.my_shares == 0")
        span() You do not own this asset

      HList(px="6" py="6" font="bold" color="gray-400" items="center" justify="center" v-if="item.bids.length < 1" )
        span() There is no offers for this item

      Table(:columns="offerColumns" :rows="item.bids" id="offers" :in-drawer="true" v-else="item.bids.length > 0")
        template(#item-action="{row}" )
          button(@click="onClickAcceptOffer(row)" uppercase="~" bg="gray-500 hover:gray-400" transition="all" cut="bottom-right sm" p="x-6 y-3") Accept

</template>

<script lang="ts" setup>
import CartIcon from '~/assets/icons/cart.svg'
import TrashIcon from '~/assets/icons/trash.svg'

import type { Sale, SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';
import { useOfferContract } from "~/composables/useOffer";
import type { OfferItem } from "~/composables/useOffer";

// const { tabs, activeTab } = useTabList(['sell', 'buy'])
const { item } = defineProps<{
  item: SingleItemData
}>()

const { getSingleAttributes } = useDefaulAttributes()
const { addToCart } = useCart()
const { walletAdress } = useWallet()
const attributes = computed(() => getSingleAttributes(item))

const saleColumns: TableColumn<Sale>[] = [
  { label: "Sale Price", type: "ixt", rowKey: "price", sortable: true },
  { label: "Quanitity", rowKey: "quantity", sortable: true },
  { label: "Expiration", type: "date", rowKey: "endtime", sortable: true },
  {
    label: "Seller", rowKey: "player_username", getValue(row) {
      if (row.player_wallet.toLowerCase() == walletAdress.value?.toLowerCase())
        return 'YOU'
      return row.player_username
    }, sortable: true
  },
  { label: "Action", rowKey: "action", width: 80 }
]

const addSaleToCart = (sale: Sale) => {
  addToCart(item, sale)
}

const removeListing = (sale: Sale) => {
  console.log("remove listing")
}

const offerColumns: TableColumn<Bid>[] = [
  { label: "Sale Price", type: "ixt", rowKey: "price", sortable: true },
  { label: "Quanitity", rowKey: "quantity", sortable: true },
  {
    label: "Floor difference", rowKey: "price", getValue(row) {
      const difference = roundToDecimals(
        ((row.price * 100) / item.sale_price) - 100
        , 2)
      return Math.abs(difference)+ '% ' + (difference < 0 ? 'below' : 'above')
    }, sortable: true
  },
  { label: "Expiration", type: "date", rowKey: "due_date", sortable: true }
]
if (item.my_shares > 0)
  offerColumns.push(
    { label: "Action", rowKey: "action", width: 80 }
  )

const onClickAcceptOffer = (bid: Bid) => {
  const { acceptOffer } = useOfferContract()
  const offerItem: OfferItem = {
    token: item,
    bids: [bid]
  }
  console.log('acceptOffer', acceptOffer(offerItem, 1))
}

const playerOwnedSale = (sale: Sale) => {
  if (sale.player_wallet.toLowerCase() == walletAdress.value?.toLowerCase())
    return true
  return false
}

console.log(item.sales, 'item sales', item.my_shares, 'shares', item.bids, 'bids')


</script>
