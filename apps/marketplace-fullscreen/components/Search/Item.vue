<template lang="pug">
VList(bg="on-focused:gray-600" :focused="isFocused" b="gray-600" p="x-3 y-1" cursor="pointer")
  slot

</template>


<script setup lang="ts">
defineProps<{
  isSelected?: boolean,
  isFocused?: boolean,
}>()
</script>