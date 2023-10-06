<template lang="pug">
CorporationGravityGrade()
</template>

<script lang="ts" setup>

const { resetShopItem } = useCorporationShop()

resetShopItem()

definePageMeta({
  layout: 'corporation'
})
</script>