<template lang="pug">
VList(space-y="4")

  VList(pt="2" space-y="2")
    VList(w="full" space-y="1")
      span(text="lg" font="bold" @click="backToCollection" cursor="pointer") {{ item.name }}
      CollectionSingleItemSubHeader()
        template(#default)
          TokenCollection(:token="item" color="ix-ne")

    AttributeList(:attributes="attributes" v-if="item")

  VList(frame="~" mt="2")
    VList(aspect="square" w="full" min-h="0" bg="black")
      TokenMedia(:token="item" w="full" :is-large="true" pos="relative")
    HelperMediaBar(@transfer="onClickTransfer")

  TradeModule(:item="item") 

  ContentDrawer(:start-open="false" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="listing") listings

    template(#default)
      Table(:columns="saleColumns" :rows="item.sales" id="single-item" :in-drawer="true" v-if="item.sales && item.sales.length > 0")
        template(#item-action="{row}")
          TableButtonSmall(@click="addSaleToCart(row)" v-if="!playerOwnedSale(row)")
            CartIcon(w="3 md:6")
          TableButtonSmall(@click="cancelListingOnClick(row)" v-else)
            TrashIcon(w="3 md:6" fill="white")

      HList(v-else px="6" py="6" font="bold" color="gray-400" items="center" justify="center") 
        span() No items found

  ContentDrawer(:start-open="false" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="offer") offers
    template(#default)
      HList(px="6" py="6" font="bold" color="gray-400" items="center" justify="center" v-if="item.my_shares == 0") 
        span() You do not own this asset

      HList(px="6" py="6" font="bold" color="gray-400" items="center" justify="center" v-if="item.bids.length < 1" ) 
        span() There is no offers for this item

      Table(:columns="offerColumns" :rows="item.bids" id="offers" :in-drawer="true" v-else="item.bids.length > 0")

  CollectionSingleItemMobileMeta(:item="item")

</template>

<script lang="ts" setup>
import CartIcon from '~/assets/icons/cart.svg'
import type { Sale, SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';
import TrashIcon from '~/assets/icons/trash.svg'

const { getSingleAttributes } = useDefaulAttributes()
const { addToCart } = useCart()
const { walletAdress } = useWallet()

const attributes = computed(() => getSingleAttributes(item))

const saleColumns: TableColumn<Sale>[] = [
  { label: "Sale Price", type: "ixt", rowKey: "price", sortable: true },
  { label: "Quanitity", rowKey: "quantity", sortable: true },
  { label: "Expiration", rowKey: "endtime", sortable: true },
  { label: "Seller", rowKey: "player_id", sortable: true },
  { label: "Action", rowKey: "action", width: 80 }
]

const addSaleToCart = (sale: Sale) => {
  addToCart(item, sale)
}

const backToCollection = () => {
  navigateTo('/assets/polygon/' + item.collection)
}

const playerOwnedSale = (sale: Sale) => {
  if (sale.player_wallet.toLowerCase() == walletAdress.value?.toLowerCase())
    return true
  return false
}

const cancelListingOnClick = async (sale: Sale) => {
  displayPopup({
    type: 'unlist-item',
    item: {
      ...item,
      sale
    }
  })
}

const offerColumns: TableColumn<Bid>[] = [
  { label: "Sale Price", type: "ixt", rowKey: "price", sortable: true },
  { label: "Quanitity", rowKey: "quantity", sortable: true },

]
const { item } = defineProps<{
  item: SingleItemData
}>()

const { displayPopup } = usePopups()

const onClickTransfer = () => {
  displayPopup({
    type: 'transfer-item',
    item
  })
}

</script>