<template lang="pug">
VList()
  TransactionSummaryRow()
    template(#name) Total Price
    template(#value)
      GlitchText(:text="priceRenderString(totalIXTPrice)" suffix=" IXT")

  TransactionSummaryRow()
    template(#name) Marketplace fee
    template(#value) 2.5%

  TransactionSummaryRow(:primary="true")
    template(#name) Total potential earnings
    template(#value) 
      GlitchText(:text="totalPotentialEarning" suffix=" IXT")

</template>
  
<script lang="ts" setup>
import type { ListingItem } from "~/composables/useListing";

const { priceRenderString, getTotalIXTPrice } = useTransactions()
const totalIXTPrice = computed(() => getTotalIXTPrice(items))

const totalPotentialEarning = computed(() =>
  priceRenderString(totalIXTPrice.value * (1 - 0.025))
)

const { items } = defineProps<{
  items: ListingItem[],
}>()

</script>