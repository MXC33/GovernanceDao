<template lang="pug">
VList()
  InputSummaryRow(:primary="true")
    template(#name) {{ $t(`marketplace.price.title`) }}
    template(#value)
      GlitchText(:text="priceRenderString(totalIXTPrice)" suffix=" IXT")

</template>
  
<script lang="ts" setup>
import type { TransactionItem } from "~/composables/useTransactions";

const { priceRenderString, getTotalIXTPrice } = useTransactions()
const totalIXTPrice = computed(() => getTotalIXTPrice(items, userPrice))

const { items, userPrice } = defineProps<{
  items: TransactionItem[],
  userPrice?: boolean
}>()
</script>