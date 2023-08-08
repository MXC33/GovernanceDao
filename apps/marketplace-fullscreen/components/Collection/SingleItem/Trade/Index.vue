<template lang="pug">
VList(space-y="6")
  CollectionSingleItemHeader(:item="item" mt="4")

  AttributeList(:attributes="attributes" v-if="item")

  VList(mx="lt-md:-4" space-y="6")
    TradeModule(:item="item")

    CollectionSingleItemTradeListings(:item="item")

    CollectionSingleItemTradeOffers(:item="item")

    CollectionSingleItemMetaList(:item="item" display="lg:none")


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
