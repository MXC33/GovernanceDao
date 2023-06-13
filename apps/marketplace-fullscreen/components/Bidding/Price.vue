<template lang="pug">
VList()
  TransactionSummaryRow(:primary="true")
    template(#name) {{ $t(`marketplace.price.title`) }}
    template(#value)
      GlitchText(:text="priceRenderString(totalIXTPrice)" suffix=" IXT")

</template>
  
<script lang="ts" setup>
import type { TransactionItem } from "~/composables/useTransactions";

const { priceRenderString, getTotalIXTPrice } = useTransactions()
const totalIXTPrice = computed(() => getTotalIXTPrice(items, true))

const { items } = defineProps<{
  items: TransactionItem[],
}>()
</script>