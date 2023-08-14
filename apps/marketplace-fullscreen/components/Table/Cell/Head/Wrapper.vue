
<template lang="pug">
TableCellWrapper(bg="gray-900" z="3" font="400" color="gray-200" pos="sticky top-0" py="4" :align-end="lastCol")
  slot
      
</template>

<script setup lang="ts">
defineProps<{
  lastCol?: boolean
}>()
</script>

<style scoped></style>