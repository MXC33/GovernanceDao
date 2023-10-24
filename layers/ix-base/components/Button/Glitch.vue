<template lang="pug">
ButtonAnimated(ref="button" whitespace="nowrap")
  GlitchText(:text="text" :hover="true" :is-hovered="isHovered")
  </template>
    
<script lang="ts" setup>
const button = ref()
const isHovered = useElementHover(button)
defineProps<{
  text: string,
}>()
</script>