<template lang="pug">
div(grid="~ cols-8 gap-3" px="6")
  div(grid="col-span-3")
    VList(space-y="6")
      VList(frame="~")
        TokenMedia(:token="item" w="full" :is-large="true" pos="relative")
        HelperMediaBar

      ContentDrawer(:start-open="true" v-if="item.description" bg="gray-900" px="6")
        template(#titleicon)
          TitleWithIcon(icon="description") description
        template(#default) 
          div(p="6") {{ item.description }}

      ContentDrawer(:start-open="true" bg="gray-900" px="6")
        template(#titleicon)
          TitleWithIcon(icon="traits") traits
        template(#default) 
          div(grid="~ cols-3 gap-3" p="6")
            AttributeTrait(v-for="trait in item.attributes")
              template(#category) {{ trait.trait_type }}
              template(#name) {{ trait.value }}

  div(grid="col-span-5")
    VList(space-y="3")
      h3(text="3xl" font="bold") {{ item.name }}

      AttributeList(:attributes="attributes" v-if="item")

      TradeModule(:owner-value="3" :item="item")
        template(#header)
          TabItem(v-for="tab in tabs" :id="tab" v-model="activeTab") {{ tab }}

      ContentDrawer(:start-open="true" px="6")
        template(#titleicon)
          TitleWithIcon(icon="listing") listing
        template(#default)
          Table(:columns="saleColumns" :rows="item.sales" id="single-item" :in-drawer="true")
            template(#item-action="{row}")
              button(@click="addSaleToCart(row)" bg="gray-500 hover:gray-400" transition="all" cut="bottom-right sm" p="x-6 y-3")
                CartIcon(w="6")

      ContentDrawer(:start-open="true" px="6")
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

const isSelected = ref(false)

// console.log("Item", item)
</script>