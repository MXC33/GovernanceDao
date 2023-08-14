<template lang="pug">
VList()
  TransactionSummaryRow()
    template(#name) {{ $t(`marketplace.price.title`) }}
    template(#value)
      GlitchText(:text="priceRenderString(totalIXTPrice)" suffix=" IXT")

  TransactionSummaryRow()
    template(#name) {{ $t(`marketplace.price.marketplaceFee`) }}
    template(#value) 5%

  TransactionSummaryRow(:primary="true")
    template(#name) {{ $t(`marketplace.price.totalEarnings`) }}
    template(#value)
      VList(space-y="-1.5")
        GlitchText(:text="totalPotentialEarning" suffix=" IXT")
        //- div(font="normal") ${{ usdBalanceRounded }}
        GlitchText(:text="usdBalanceRounded" suffix="$ " font="normal" :is-dollar="true" v-if="spacingUsd")
        GlitchText(:text="usdBalanceRounded" suffix="$" font="normal" :is-dollar="true" v-else)


</template>
  
<script lang="ts" setup>
import type { ListingItem } from "~/composables/useListing";

const { priceRenderString, getTotalIXTPrice } = useTransactions()
const { ixtToUSD } = useIXTPrice()

const totalIXTPrice = computed(() => getTotalIXTPrice(items, true))

const totalPotentialEarning = computed(() =>
  priceRenderString(totalIXTPrice.value * (1 - 0.025))
)

const usdBalanceRounded = computed(() => {
  const value = ixtToUSD(Number(totalPotentialEarning.value))

  if (isNaN(value)) {
    return '--'

  } else if (value < 1) {
    const roundedValue = roundToDecimals(value, 5)
    return roundedValue.toString()

  } else if (value >= 1) {
    const roundedValue = roundToDecimals(value, 2)
    return roundedValue.toString()
  }

  return '--'
})

const spacingUsd = computed(() => {
  if (usdBalanceRounded.value == '--')
    return true
  return false
})

const { items } = defineProps<{
  items: ListingItem[],
}>()

</script>