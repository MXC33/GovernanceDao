<template lang="pug">
CorporationYSpace()
</template>
  
<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: "corporation"
})
</script>