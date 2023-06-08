
<template lang="pug">
th(p="2 md:(3 first:l-6 last:r-6)" bg="gray-900" z="3" font="400" color="gray-200" whitespace="nowrap" )
  slot
      
</template>

<script setup lang="ts">

const { drawer } = defineProps<{
  drawer?: boolean,
}>()
</script>

<style scoped></style>