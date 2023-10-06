<template lang="pug">
VList(text="sm")
  div()
    HList(space-x="2")
      span(v-if="isInvalid" color="semantic-warning") {{ $t(`marketplace.transactions.priceNotSet`) }}
      GlitchText(v-else-if="!item.ixtPrice" text="--" font="bold" suffix=" IXT")
      GlitchText(v-else :text="String(item.ixtPrice)" font="bold" suffix=" IXT")

      GlitchText(:text="usdBalanceRounded" font="normal" suffix="$" :is-dollar="true")


  div(v-if="item.type != 'accept'" )
    span(v-if="!item.durationInDays" color="semantic-warning") {{ $t(`marketplace.transactions.timeNotSet`) }}
    GlitchText(v-else font="bold" capitalize="~" :text="formattedDays(item.durationInDays)")

</template>

<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'

const { item } = defineProps<{ item: TransactionItem }>()
const { formattedDays, itemIsInvalid } = useTransactions()
const { ixtToUSD } = useCurrencyConversion()

const isInvalid = computed(() => itemIsInvalid(item))


const usdBalanceRounded = computed(() => {
  const value = ixtToUSD(Number(item.ixtPrice))

  if (value == 0) {
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
</script>
