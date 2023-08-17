
<template lang="pug">
TableCellWrapper(z="3" font="400" color="gray-200" pos="sticky top-0" py="2" :align-end="lastCol" :has-bg="true")
  slot
      
</template>

<script setup lang="ts">
defineProps<{
  lastCol?: boolean
}>()
</script>

<style scoped></style>