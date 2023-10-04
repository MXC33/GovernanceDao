<template lang="pug">
CorporationItemsAndDetailWrapper(v-bind="props" :active-item="activeItem" @close="activeItem = null")
  template(#tabs v-if="$slots.tabs")
    slot(name="tabs")

  template(#noItems v-if="$slots.noItems && (!list || list.length == 0)")
    slot(name="noItems")


  template(#grid v-else-if="$slots.grid")
    slot(name="grid")

  template(#list v-else-if="$slots.list")
    slot(name="list")

  template(#afterList v-if="$slots.afterList")
    slot(name="afterList")

  template(#outsideScroll v-if="$slots.outsideScroll")
    slot(name="outsideScroll")

  template(#cartLeft v-if="$slots.cartLeft")
    slot(name="cartLeft")

  template(#cartRight v-if="$slots.cartRight")
    slot(name="cartRight")

</template>
  
<script lang="ts" setup>
import type { Currency } from '@ix/base/composables/Utils/useCurrencies';
import type { TokenWithInfoBlocks } from '~~/composables/useInfoBlocks';

const props = defineProps<{
  header?: string,
  listTitle?: string,
  detailTitle: string,
  list?: TokenWithInfoBlocks[],
  currency?: Currency
}>()

const activeItem = defineModel<TokenWithInfoBlocks>()

watch(() => props.list, (list) => {
  if (!activeItem.value && list?.length > 0)
    activeItem.value = list[0]

}, { immediate: true })


</script>
  