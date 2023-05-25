<template lang="pug">
div() 
  div(text="red" p="2") {{ title }} 
  div(border="~bottom 1 red" w="90%")
  slot()
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>