<template lang="pug">
VList()
  InputSummaryRow(:primary="true")
    template(#name) {{ $t(`marketplace.price.title`) }}
    template(#value)
      GlitchText(:text="priceRenderString(totalIXTPrice)" suffix=" IXT")

  InputSummaryRow()
    template(#name) {{ $t(`marketplace.price.marketplaceFee`) }}
    template(#value) 5%

  InputSummaryRow(:primary="true")
    template(#name) {{ $t(`marketplace.price.totalEarnings`) }}
    template(#value)
      GlitchText(:text="totalPotentialEarning" suffix=" IXT")

</template>

<script lang="ts" setup>
import type { TransactionItem } from "~/composables/useTransactions";

const { priceRenderString, getTotalIXTPrice, MP_FEE } = useTransactions()
const totalIXTPrice = computed(() => getTotalIXTPrice(items, true))

const totalPotentialEarning = computed(() =>
  priceRenderString(totalIXTPrice.value * (1 - MP_FEE))
)

const { items } = defineProps<{
  items: TransactionItem[],
}>()
</script>
