<template lang="pug">
HList(pos="relative" ref="menuElement" frame="~ $mc-accent " items="center" transition="all" h="10" justify="center" color="$corporation-text" display="lt-md:none")  
  HList(px="3" space-x="2" min-w="40")
    div {{ balance }}
    div(uppercase="~") {{  currency }}

  div(h="full" pos="relative" aspect="square")
    div(pos="absolute" inset="0" bg="$mc-accent" opacity="20")
    CorporationCurrencyIcon(:currency="currency" wh="6" fill="white" pos="absolute top-50% left-50%" translate-x="-50%" translate-y="-50%")

</template>

<script lang="ts" setup>
import type { Currency } from '@ix/base/composables/Utils/useCurrencies';

const { getCurrencyBalance, fetchAllCurrencies } = useCurrencyData()

const { currency } = defineProps<{
  currency: Currency
}>()

fetchAllCurrencies()

const balance = computed(() =>
  getCurrencyBalance(currency)
)

</script>