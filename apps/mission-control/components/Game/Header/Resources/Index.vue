<template lang="pug">
HList(p="2" space-x="3 lg:6")
  GameHeaderResourcesItem(type="mc-level")
  GameHeaderResourcesItem(type="ixt")
  GameHeaderResourcesItem(type="astro-gold")
  GameHeaderResourcesItem(v-if="astroGoldLiteBalance > 0" type="astro-gold-lite")
  GameHeaderResourcesItem(type="astro-credit")
  GameHeaderResourcesItem(type="waste")
  GameHeaderResourcesItem(type="energy")
  GameHeaderResourcesItem(type="power")
  GameHeaderResourcesItem(type="gas-price", :hideNumber='true')

  slot(name="hoverInfo")

</template>

<script setup lang="ts">
const { astroGoldLiteBalance } = useCurrencyData()
</script>