<template lang="pug">
TransactionItem(v-model="item")
  template(#adjustments)
    TransactionItemAdjustQuantity(v-model="item")
      template(#max="{max}") {{ $t(`marketplace.bid.maxAmount`) }} {{ max }}

</template>

<script lang="ts" setup>
import type { AcceptingItem } from "~/composables/useOffer";

const item = defineModel<AcceptingItem>()
console.log("ACCEPT ITEM", item)
</script>
