<template lang="pug">
HList(py="4" items="center" justify="center")
  HList(font="bold")
    CorporationSwapAccountHistoryToken(:token="item.from" :amount="item.amount")
    IconRightArrow(w="4" m="r-4 l-4")
    CorporationSwapAccountHistoryToken(:token="item.to" :amount="item.amount")



</template>
    
<script lang="ts" setup>
import IconRightArrow from '/assets/images/ui/astro-arrow.svg'

import type { SwapHistoryItem } from '~~/composables/corporations/useCorporationShop'

const props = defineProps<{
  item: SwapHistoryItem
}>()

</script>