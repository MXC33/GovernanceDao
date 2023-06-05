<template lang="pug">
VList(space-y="6")
  VList()
    h3(text="3xl" font="bold") {{ item.name }}

    CollectionSingleItemSubHeader()
      template(#default)
        TokenCollection(:token="item" color="ix-ne") 

  AttributeList(:attributes="attributes" v-if="item")

  ContentDrawer(:start-open="true" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="listing") listings

    template(#default)
      Table(:columns="saleColumns" :rows="item.sales" id="single-item" :in-drawer="true" v-if="item.sales.length > 0")
        template(#item-action="{row}")
          button(@click="addSaleToCart(row)" bg="gray-500 hover:gray-400" transition="all" cut="bottom-right sm" p="x-6 y-3")
            CartIcon(w="6")

      HList(v-else px="6" py="6" font="bold" color="gray-400" items="center" justify="center") 
        span() No items found

  ContentDrawer(:start-open="true" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="offer") offers
    template(#default)
      HList(px="6" py="6" font="bold" color="gray-400" items="center" justify="center" v-if="item.my_shares == 0") 
        span() You do not own any item of this collection

      HList(px="6" py="6" font="bold" color="gray-400" items="center" justify="center" v-else-if="item.bids.length < 1" ) 
        span() There is no offers for this item

      Table(:columns="offerColumns" :rows="item.bids" id="offers" :in-drawer="true" v-else="item.bids.length > 0")

</template>

<script lang="ts" setup>
import CartIcon from '~/assets/icons/cart.svg'
import type { Sale, SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';

const { getSingleAttributes } = useDefaulAttributes()
const { addToCart } = useCart()
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

const offerColumns: TableColumn<Bid>[] = [
  { label: "Sale Price", type: "ixt", rowKey: "price", sortable: true },
  { label: "Quanitity", rowKey: "quantity", sortable: true },

]
const { item } = defineProps<{
  item: SingleItemData
}>()

console.log(item.sales, 'item sales', item.my_shares, 'shares', item.bids, 'bids')


</script>
