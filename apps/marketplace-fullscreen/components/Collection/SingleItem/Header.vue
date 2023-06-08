<template lang="pug">
VList(mt="4 md:6")
  h3(text="3xl" font="bold") {{ item.name }}

  CollectionSingleItemSubHeader()

    NuxtLink(:to="collectionLink")
      TokenCollection(:token="item" color="ix-ne")

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
