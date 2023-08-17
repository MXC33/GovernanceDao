<template lang="pug">
ContentDrawer(:start-open="!isMobile" :is-neutral="true" bg="gray-900" mx="lt-md:-4" :disable="!hasDrawer" :is-table="true")
  template(#titleicon)
    TitleWithIcon(icon="listing") {{ $t(`marketplace.singleItem.listings`) }}

  template(#default)

    Table(v-if="item.sales && item.sales.length > 0" :columns="saleColumns" :rows="item.sales" id="single-item")

    CollectionSingleItemTradeDetail(v-else) {{ $t(`marketplace.singleItem.noItemsFound`) }}


</template>

<script lang="ts" setup>
import type { Sale, SingleItemData } from '@ix/base/composables/Token/useIXToken';
import type { UnlistingItem } from 'composables/useListing';
import type { TableColumn } from '~/composables/useTable';

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const { isMobile } = useDevice()

const { item } = defineProps<{
  item: SingleItemData,
  hasDrawer?: boolean
}>()

const { addToCart, hasItemInCart } = useCart()
const { walletAdress } = useWallet()

const saleColumns: TableColumn<Sale>[] = [
  { label: "Unit Price", type: "ixt", rowKey: "price", sortable: true },
  { label: "USD Price", type: "usd", rowKey: "price", sortable: true, hideMobile: true },
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
    type: 'buttons', width: 'auto', buttons: [
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
    items: [{
      ...item,
      sale
    }]
  })
}


const { displayPopup } = usePopups()

const playerOwnedSale = (sale: Sale) => {
  if (sale.player_wallet.toLowerCase() == walletAdress.value?.toLowerCase())
    return true
  return false
}

</script>
