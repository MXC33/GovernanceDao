<template lang="pug">
TransactionItem(v-model="item")
  template(#adjustments)
    TransactionItemAdjustPrice(v-model="item")
    TransactionItemAdjustQuantity(v-model="item")
      template(#max="{max}") Max amount {{ max }}

    TransactionItemAdjustDuration(v-model="item")

</template>
  
<script lang="ts" setup>
import type { BiddingItem } from '~/composables/useBidding';
const item = defineModel<BiddingItem>()
console.log("BID ITEM", item)
</script>
  