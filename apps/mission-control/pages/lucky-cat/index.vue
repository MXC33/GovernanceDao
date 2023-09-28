<template lang="pug">
CorporationLuckyCat()
</template>


<script lang="ts" setup>

const { resetShopItem } = useCorporationShop()

resetShopItem()

definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})
</script>