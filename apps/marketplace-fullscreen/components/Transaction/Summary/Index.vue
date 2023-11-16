<template lang="pug">
VList()
  InputSummaryRow()
    template(#name) {{ $t(`marketplace.price.title`) }}
    template(#value)
      GlitchText(:text="totalPrice" suffix=" IXT")

  InputSummaryRow()
    template(#name) {{ $t(`marketplace.price.marketplaceFee`) }}
    template(#value) 5%

  InputSummaryRow(:primary="true")
    template(#name) {{ $t(`marketplace.price.totalEarnings`) }}
    template(#value) 
      GlitchText(:text="totalPotentialEarning" suffix=" IXT")

</template>

<script lang="ts" setup>
import type { ListingItem } from "~/composables/useListing";

const { getTotalIXTPrice, MP_FEE } = useTransactions()

const totalPrice = computed(() => String(invalidPrice.value ?? roundToDecimals(totalIXTPrice.value, 4)))

const totalIXTPrice = computed(() => getTotalIXTPrice(items))

const totalPotentialEarning = computed(() =>
  String(invalidPrice.value ?? roundToDecimals(totalIXTPrice.value * (1 - MP_FEE), 4))
)

const invalidPrice = computed(() => {
  if (!totalIXTPrice.value)
    return '--'
})

const { items } = defineProps<{
  items: ListingItem[],
}>()


</script>