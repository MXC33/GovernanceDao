<template lang="pug">
VList()
  TransactionSummaryRow(:primary="true")
    template(#name) {{ $t(`marketplace.price.title`) }}
    template(#value)
      GlitchText(:text="priceRenderString(totalIXTPrice)" suffix=" IXT")

  TransactionSummaryRow()
    template(#name) {{ $t(`marketplace.price.marketplaceFee`) }}
    template(#value) 5%

  TransactionSummaryRow(:primary="true")
    template(#name) {{ $t(`marketplace.price.totalEarnings`) }}
    template(#value)
      GlitchText(:text="totalPotentialEarning" suffix=" IXT")

</template>

<script lang="ts" setup>
import type { TransactionItem } from "~/composables/useTransactions";

const { priceRenderString, getTotalIXTPrice } = useTransactions()
const totalIXTPrice = computed(() => getTotalIXTPrice(items, true))

const totalPotentialEarning = computed(() =>
  priceRenderString(totalIXTPrice.value * (1 - 0.025))
)

const { items } = defineProps<{
  items: TransactionItem[],
}>()
</script>
