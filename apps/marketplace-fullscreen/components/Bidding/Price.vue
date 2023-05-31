<template lang="pug">
VList()
  TransactionSummaryRow(:primary="true")
    template(#name) Total Price
    template(#value)
      GlitchText(:text="priceRenderString(totalIXTPrice)" suffix=" IXT")

</template>
  
<script lang="ts" setup>
import type { BiddingItem } from "~/composables/useBidding";

const { priceRenderString, getTotalIXTPrice } = useTransactions()
const totalIXTPrice = computed(() => getTotalIXTPrice(items))

const { items } = defineProps<{
  items: BiddingItem[],
}>()
</script>