<template lang="pug">
ListItem()
  template(#image)
    img(src="~/assets/images/ixt-coin.png")
  template(#title)
    span(text="detail") My balance

  template(#description)
    div
      span(text="subheading") {{ixtBalanceRounded}} IXT 
      span(text="detail") ${{usdBalanceRounded}}

</template>

<script lang="ts" setup>
const { ixtToUSD } = useCurrencyConversion()
const { ixtBalance } = useCurrencyData()
const ixtBalanceRounded = computed(() => roundToDecimals(ixtBalance.value ?? 0, 2))
const usdBalanceRounded = computed(() => roundToDecimals(ixtToUSD(ixtBalance.value ?? 0), 2))


</script>