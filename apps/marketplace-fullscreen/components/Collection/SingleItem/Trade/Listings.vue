<template lang="pug">
ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900")
  template(#titleicon)
    TitleWithIcon(icon="listing") {{ $t(`marketplace.singleItem.listings`) }}

  template(#default)
    TableNew(v-if="item.sales && item.sales.length > 0" :columns="saleColumns" :rows="item.sales" id="single-item" :col-width="150")

    CollectionSingleItemTradeDetail(v-else) {{ $t(`marketplace.singleItem.noItemsFound`) }}

</template>

<script lang="ts" setup>
import type { Sale, SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';
const { isMobile } = useDevice()

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
  {
    type: 'buttons', width: 120, buttons: [
      {
        type: 'secondary',
        onClick(row) {
          addSaleToCart(row)
        },
        icon: 'cart',
        hidden(row) { return playerOwnedSale(row) },
        disabled(row) { return hasItemInCart(row) }
      },
      {
        type: 'secondary',
        onClick(row) {
          cancelListingOnClick(row)
        },
        icon: 'trash',
        hidden(row) { return !playerOwnedSale(row) },
      }
    ]
  }
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
