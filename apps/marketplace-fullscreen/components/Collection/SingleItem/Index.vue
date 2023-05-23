<template lang="pug">
div(grid="~ cols-8 gap-3" px="6")
  div(grid="col-span-3")
    VList(space-y="6")
      TokenMedia(:token="item" w="full" frame="~" :is-large="true")

      ContentDrawer(:start-open="true")
        template(#header) Description
        template(#default) {{ item.attributes }}

      ContentDrawer(:start-open="true")
        template(#header) Description
        template(#default) 
          div(grid="~ cols-3 gap-3" pb="3")
            AttributeTrait(v-for="trait in item.attributes")
              template(#category) {{ trait.trait_type }}
              template(#name) {{ trait.value }}

  div(grid="col-span-5")
    VList()
      h3(text="3xl" font="bold") {{ item.name }}

      AttributeList(:attributes="attributes" v-if="item")

      ContentDrawer(:start-open="true")
        template(#header) Listings
        template(#default)
          Table(:columns="columns" :rows="item.sales" id="single-item" :in-drawer="true")

</template>

<script lang="ts" setup>
import type { Sale, SingleItemData } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';

const { getSingleAttributes } = useDefaulAttributes()
const attributes = computed(() => getSingleAttributes(item))

const columns: TableColumn<Sale>[] = [
  { label: "Sale Price", value: "price", sortable: true },
  { label: "Quanitity", value: "quantity", sortable: true },
  { label: "Expiration", value: "endtime", sortable: true },
  { label: "Seller", value: "player_id", sortable: true },
]

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>