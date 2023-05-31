<template lang="pug">
VList()
  TransactionSummaryRow()
    template(#name) Total Price
    template(#value)
      GlitchText(:text="totalPrice" suffix=" IXT")

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

const { getTotalIXTPrice } = useTransactions()

const totalPrice = computed(() => String(invalidPrice.value ?? roundToDecimals(totalIXTPrice.value, 4)))

const totalIXTPrice = computed(() => getTotalIXTPrice(items))

const totalPotentialEarning = computed(() =>
  String(invalidPrice.value ?? roundToDecimals(totalIXTPrice.value * (1 - 0.025), 4))
)

const invalidPrice = computed(() => {
  if (!totalIXTPrice.value)
    return '--'
})

const { items } = defineProps<{
  items: ListingItem[],
}>()


</script>