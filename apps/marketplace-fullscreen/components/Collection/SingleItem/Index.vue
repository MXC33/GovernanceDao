<template lang="pug">
VList(pb="6")
  div(grid="lg:~ cols-8 gap-8" px="4 md:8")
    div(grid="col-span-3")
      CollectionSingleItemMeta(:item="item")

    div(grid="col-span-5")
      CollectionSingleItemTrade(:item="item")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const { item } = defineProps<{
  item: SingleItemData
}>()

</script>