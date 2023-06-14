<template lang="pug">
TransactionItem(v-model="item" :is-transfer="true" :is-multiple="isMultiple")
  template(#adjustments)
    TransactionItemAdjustQuantity(v-model="item")

</template>
  
<script lang="ts" setup>
import type { TransferItem } from '~/composables/useTransfer'
const item = defineModel<TransferItem>()

const { isMultiple } = defineProps<{
  isMultiple?: boolean
}>()

</script>
  