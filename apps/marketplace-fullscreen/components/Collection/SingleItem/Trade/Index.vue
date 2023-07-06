<template lang="pug">
VList(space-y="6")
  CollectionSingleItemHeader(:item="item" display="lt-md:!none")

  AttributeList(:attributes="attributes" v-if="item")

  VList(mx="lt-md:-4")
    TradeModule(:item="item")

  CollectionSingleItemTradeListings(:item="item")

  CollectionSingleItemTradeOffers(:item="item")

  CollectionSingleItemMetaList(:item="item" display="md:none")


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
