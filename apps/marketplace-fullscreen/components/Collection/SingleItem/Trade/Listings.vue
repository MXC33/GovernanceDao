<template lang="pug">
ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900")
  template(#titleicon)
    TitleWithIcon(icon="listing") {{ $t(`marketplace.singleItem.listings`) }}

  template(#default)
    TableBody(v-if="item.sales && item.sales.length > 0" :columns="saleColumns" :rows="item.sales" id="single-item" :col-width="150")
      template(#item-buttons="{row}")
        TableButtonSmall(v-if="!playerOwnedSale(row)" @click="addSaleToCart(row)" disable="on-in-cart:active" :in-cart="hasItemInCart(row)")
          CartIcon(w="4 md:6")

        TableButtonSmall(@click="cancelListingOnClick(row)" v-else)
          TrashIcon(w="4 md:6" fill="white")

    CollectionSingleItemTradeDetail(v-else) {{ $t(`marketplace.singleItem.noItemsFound`) }}

</template>

<script lang="ts" setup>
import CartIcon from '~/assets/icons/cart.svg'
import TrashIcon from '~/assets/icons/trash.svg'

import type { Sale, SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';
const isMobile = onMobile()

const { item } = defineProps<{
  item: SingleItemData
}>()

const { addToCart, hasItemInCart } = useCart()
const { walletAdress } = useWallet()

const saleColumns: TableColumn<Sale>[] = [
  { label: "Unit Price", type: "ixt", rowKey: "price", sortable: true },
  { label: "USD Price", type: "usd", rowKey: "price", sortable: true },
  { label: "Quanitity", rowKey: "quantity", sortable: true },
  { label: "Expiration", type: "date", rowKey: "endtime", sortable: true },
  {
    label: "Seller", rowKey: "player_username", getValue(row) {
      if (row.player_wallet.toLowerCase() == walletAdress.value?.toLowerCase())
        return 'YOU'
      return row.player_username
    }, sortable: true
  },
  { type: 'buttons', width: 120 }
]

const addSaleToCart = (sale: Sale) => {
  addToCart(item, sale)
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

const { displayPopup } = usePopups()

const playerOwnedSale = (sale: Sale) => {
  if (sale.player_wallet.toLowerCase() == walletAdress.value?.toLowerCase())
    return true
  return false
}

</script>
