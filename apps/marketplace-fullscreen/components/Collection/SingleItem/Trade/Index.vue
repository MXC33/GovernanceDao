<template lang="pug">
VList(space-y="6")
  VList()
    h3(text="3xl" font="bold") {{ item.name }}

    CollectionSingleItemSubHeader()
      template(#default)

  NuxtLink(:to="collectionLink")
    TokenCollection(:token="item" color="ix-ne")

  AttributeList(:attributes="attributes" v-if="item")

  TradeModule(:item="item")

  CollectionSingleItemTradeListings(:item="item")

  CollectionSingleItemTradeOffers(:item="item")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const { item } = defineProps<{
  item: SingleItemData
}>()

const collectionLink = computed(() => {
  const { network, collection } = item
  return `/assets/${network}/${collection}`
})

const { getSingleAttributes } = useDefaulAttributes()
const attributes = computed(() => getSingleAttributes(item))

</script>
