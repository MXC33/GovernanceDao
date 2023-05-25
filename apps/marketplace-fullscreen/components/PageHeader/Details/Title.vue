<template lang="pug">
div() 
  div(text="red") {{ title }} 
  div()
  slot()
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>