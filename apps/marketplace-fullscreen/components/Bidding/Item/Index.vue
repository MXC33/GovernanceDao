<template lang="pug">
TransactionItem(v-model="item" :is-multiple="isMultiple")
  template(#adjustments)
    TransactionItemAdjustPrice(v-model="item")
    TransactionItemAdjustQuantity(v-model="item")
      template(#max="{max}") {{ $t(`marketplace.bid.maxAmount`) }} {{ max }}

    TransactionItemAdjustDuration(v-model="item")

</template>
  
<script lang="ts" setup>
import type { BiddingItem } from '~/composables/useBidding';
const item = defineModel<BiddingItem>()
console.log("BID ITEM", item)

const { isMultiple } = defineProps<{
  isMultiple?: boolean
}>()
</script>
  