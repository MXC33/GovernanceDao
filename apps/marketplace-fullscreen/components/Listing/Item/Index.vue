<template lang="pug">
TransactionItem(v-model="item" :is-multiple="isMultiple")
  template(#adjustments)
    TransactionItemAdjustPrice(v-model="item")
    TransactionItemAdjustQuantity(v-model="item")
    TransactionItemAdjustDuration(v-model="item")

</template>
  
<script lang="ts" setup>
import type { ListingItem } from '~/composables/useListing'
const item = defineModel<ListingItem>()

const { isMultiple } = defineProps<{
  isMultiple?: boolean
}>()
</script>
  