<template lang="pug">
VList()
  h6(v-if="$slots.detail" text="xs" color="gray-300")
    slot(name="detail")

  h3
    slot
  </template>
  
<script lang="ts" setup>

</script>