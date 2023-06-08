<template lang="pug">
VList()
  div(grid="md:~ cols-8 gap-3" px="6" pb="6")
    div(grid="col-span-3")
      CollectionSingleItemMeta(:item="item")

    div(grid="col-span-5")
      CollectionSingleItemTrade(:item="item")

  //- div(grid="~ cols-5 gap-3" px="4" pb="6" display="md:none")
  //-   CollectionSingleItemMobile(:item="item" grid="col-span-5")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const { item } = defineProps<{
  item: SingleItemData
}>()
</script>