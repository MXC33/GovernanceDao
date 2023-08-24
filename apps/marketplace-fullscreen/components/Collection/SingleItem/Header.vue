<template lang="pug">
VList()
  h1(text="3xl" font="bold") {{ item.name }}

  CollectionSingleItemSubHeader()

    NuxtLink(:to="collectionLink")
      TokenCollection(:token="item" color="ix-ne hover:opacity-80")

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

</script>
