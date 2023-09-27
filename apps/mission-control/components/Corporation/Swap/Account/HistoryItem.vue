<template lang="pug">
div(grid="~ cols-4 gap-2" b="1 $mc-accent-40" p="x-2 y-4" items="center")
  HList(items="center" space-x="2" font="bold" grid="col-span-3")
    CorporationSwapAccountHistoryToken(:token="item.from" :amount="item.amount")
    HList
      IconRightArrow(w="4")
    CorporationSwapAccountHistoryToken(:token="item.to" :amount="item.amount")

  div(text="right" uppercase="~") {{ date }}


</template>
    
<script lang="ts" setup>
import IconRightArrow from '/assets/images/ui/astro-arrow.svg'

import { format } from 'date-fns';
import type { SwapHistoryItem } from '~~/composables/corporations/useCorporationShop'

const date = computed(() => format(props.item.date, 'dd MMM yyyy'))

const props = defineProps<{
  item: SwapHistoryItem
}>()

</script>