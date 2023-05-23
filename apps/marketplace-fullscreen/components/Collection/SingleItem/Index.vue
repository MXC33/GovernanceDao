<template lang="pug">
div(grid="~ cols-8 gap-3" px="6")
  VList(grid="col-span-3")
    TokenImage(:token="item" w="full" frame="~")

  VList(grid="col-span-5")
    h3(text="3xl" font="bold") {{ item.name }}

    AttributeList(:attributes="attributes" v-if="item")

    ContentDrawer()
      template(#header) Listings
      template(#default)
        Table(:columns="columns" :rows="item.sales" id="single-item")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';
import type { TableColumn } from '~/composables/useTable';

const { getSingleAttributes } = useDefaulAttributes()
const attributes = computed(() => getSingleAttributes(item))

const columns: TableColumn<SingleItemData['sales'][number]>[] = [
  { label: "Sale Price", value: "price", sortable: true },
]

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>