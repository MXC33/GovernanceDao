<template lang="pug">
div(grid="~ cols-8 gap-3" px="6")
  div(grid="col-span-3")
    VList()
      TokenImage(:token="item" w="full" frame="~")

  div(grid="col-span-5")
    VList()
      h3(text="3xl" font="bold") {{ item.name }}

      AttributeList(:attributes="attributes" v-if="item")

      ContentDrawer(:start-open="true")
        template(#header) Listings
        template(#default)
          Table(:columns="columns" :rows="item.sales" id="single-item")

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