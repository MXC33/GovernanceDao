<template lang="pug">
div(grid="~ cols-8 gap-3" px="6")
  div(grid="col-span-3")
    VList(space-y="6")
      TokenMedia(:token="item" w="full" frame="~" :is-large="true")

      ContentDrawer(:start-open="true" v-if="item.description")
        template(#header) Description
        template(#default) 
          div(p="3 t-0") {{ item.description }}

      ContentDrawer(:start-open="true")
        template(#header) Description
        template(#default) 
          div(grid="~ cols-3 gap-3" pb="3")
            AttributeTrait(v-for="trait in item.attributes")
              template(#category) {{ trait.trait_type }}
              template(#name) {{ trait.value }}

  div(grid="col-span-5")
    VList(space-y="3")
      h3(text="3xl" font="bold") {{ item.name }}

      AttributeList(:attributes="attributes" v-if="item")

      Listing(:item="item")

      ContentDrawer(:start-open="true")
        template(#header) Listings
        template(#default)
          Table(:columns="saleColumns" :rows="item.sales" id="single-item" :in-drawer="true")

      ContentDrawer(:start-open="true")
        template(#header) Offers
        template(#default)
          Table(:columns="offerColumns" :rows="item.bids" id="offers" :in-drawer="true")

</template>

<script lang="ts" setup>
import type { Sale, SingleItemData, Bid } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';

const { getSingleAttributes } = useDefaulAttributes()
const attributes = computed(() => getSingleAttributes(item))

const saleColumns: TableColumn<Sale>[] = [
  { label: "Sale Price", value: "price", sortable: true },
  { label: "Quanitity", value: "quantity", sortable: true },
  { label: "Expiration", value: "endtime", sortable: true },
  { label: "Seller", value: "player_id", sortable: true },
  { label: "Action", value: "action", sortable: true },
]

const offerColumns: TableColumn<Bid>[] = [
  { label: "Sale Price", value: "price", sortable: true },
  { label: "Quanitity", value: "quantity", sortable: true },
]
const { item } = defineProps<{
  item: SingleItemData
}>()

console.log("Item", item)
</script>