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
        VList()
          div(v-for="sale in item.sales")
            h3 {{ sale.price }}


</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const { getSingleAttributes } = useDefaulAttributes()
const attributes = computed(() => getSingleAttributes(item))

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>