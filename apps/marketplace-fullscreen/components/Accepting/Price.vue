<template lang="pug">
VList()
  TransactionSummaryRow(:primary="true")
    template(#name) Total Price
    template(#value)
      GlitchText(:text="priceRenderString(totalIXTPrice)" suffix=" IXT")

  TransactionSummaryRow()
    template(#name) Marketplace fee
    template(#value) 5%

  TransactionSummaryRow(:primary="true")
    template(#name) Total potential earnings
    template(#value)
      GlitchText(:text="totalPotentialEarning" suffix=" IXT")

</template>

<script lang="ts" setup>
import type { TransactionItem } from "~/composables/useTransactions";

const { priceRenderString, getTotalIXTPrice } = useTransactions()
const totalIXTPrice = computed(() => getTotalIXTPrice([item]))

const totalPotentialEarning = computed(() =>
  priceRenderString(totalIXTPrice.value * (1 - 0.025))
)

const { item } = defineProps<{
  item: TransactionItem,
}>()
</script>
