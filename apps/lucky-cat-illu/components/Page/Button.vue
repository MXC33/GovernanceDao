<template lang="pug">
button(bg="pink" rounded="full" p="x-6 y-3" ref="button" font="bold") 
  GlitchText(:text="text" :hover="true" :is-hovered="isHovered" v-if="text" whitespace="no-wrap")
  slot
</template>
    
<script lang="ts" setup>
const button = ref()
const isHovered = useElementHover(button)
defineProps<{
  text?: string,
}>()
</script>