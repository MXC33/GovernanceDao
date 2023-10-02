<template lang="pug">
CorporationSwap(id="astro-cap")
</template>

<script lang="ts" setup>
const { state } = useCorporationSwap()
const { execute: fetchCurrencyData, astroGoldToken, ixtToken } = useCurrencyData()
const { execute: fetchTokens } = useTokenData()

await Promise.all([
  fetchTokens(),
  fetchCurrencyData()
])

watch([ixtToken, astroGoldToken], ([ixtToken, astroGold]) => {
  state.value = {
    from: {
      ...addAdjustableToToken(ixtToken),
      exchangeRate: 1
    },
    to: {
      ...addAdjustableToToken(astroGold),
      exchangeRate: 1
    }
  }
}, { immediate: true })

</script>
