<template lang="pug">
CorporationEternaLab()
</template>

<script lang="ts" setup>

const { resetShopItem } = useCorporationShop()

resetShopItem()

definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})
</script>