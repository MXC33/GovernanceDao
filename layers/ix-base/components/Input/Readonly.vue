<template lang="pug">
div(p="x-3 y-2" bg="gray-800" color="gray-300" frame="~ gray-500 sm")
  slot

</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>()

defineProps<{
  placeholder?: string
}>()

</script>