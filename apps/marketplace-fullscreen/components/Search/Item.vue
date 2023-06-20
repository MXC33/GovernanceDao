<template lang="pug">
VList(bg="on-focused:gray-600" :focused="isFocused" p="x-3 y-2" cursor="pointer" flex-grow="1" b="gray-600")
  slot

</template>


<script setup lang="ts">
defineProps<{
  isSelected?: boolean,
  isFocused?: boolean,
}>()
</script>