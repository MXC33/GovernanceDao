<template lang="pug">
VList(space-y="6")
  h3(text="3xl" font="bold") {{ item.name }}

  AttributeList(:attributes="attributes" v-if="item")

  //- Listing(:item="item")

  TradeModule(:item="item")
    template(#header)
      TabItem(v-for="tab in tabs" :id="tab" v-model="activeTab") {{ tab }}

  ContentDrawer(:start-open="true" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="listing") listings

    template(#default)
      Table(:columns="saleColumns" :rows="item.sales" id="single-item" :in-drawer="true")
        template(#item-action="{row}")
          button(@click="addSaleToCart(row)" bg="gray-500 hover:gray-400" transition="all" cut="bottom-right sm" p="x-6 y-3")
            CartIcon(w="6")

  ContentDrawer(:start-open="true" :is-neutral="true" bg="gray-900")
    template(#titleicon)
      TitleWithIcon(icon="offer") offers
    template(#default)
      Table(:columns="offerColumns" :rows="item.bids" id="offers" :in-drawer="true")


</template>

<script lang="ts" setup>
import CartIcon from '~/assets/icons/cart.svg'
import type { Sale, SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';

const { tabs, activeTab } = useTabList(['sell', 'buy'])

const { getSingleAttributes } = useDefaulAttributes()
const { addToCart } = useCart()
const attributes = computed(() => getSingleAttributes(item))

const saleColumns: TableColumn<Sale>[] = [
  { label: "Sale Price", value: "price", sortable: true },
  { label: "Quanitity", value: "quantity", sortable: true },
  { label: "Expiration", value: "endtime", sortable: true },
  { label: "Seller", value: "player_id", sortable: true },
  { label: "Action", value: "action", width: 80 }
]

const addSaleToCart = (sale: Sale) => {
  addToCart(item, sale)
}

const offerColumns: TableColumn<Bid>[] = [
  { label: "Sale Price", value: "price", sortable: true },
  { label: "Quanitity", value: "quantity", sortable: true },

]
const { item } = defineProps<{
  item: SingleItemData
}>()

</script>
