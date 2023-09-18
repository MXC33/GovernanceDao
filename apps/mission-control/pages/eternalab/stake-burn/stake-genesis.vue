<template lang="pug">
ClientOnly()
  CorporationStakeGenesis()

</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

</script>
