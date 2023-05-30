<template lang="pug">
div() {{ glitchedText }}{{  suffix }}

</template>
  
<script lang="ts" setup>

const { text, isHovered } = defineProps<{
  text: string,
  suffix?: string,
  isHovered?: boolean
}>()

watch(() => text, (newText) => {
  if (!isGlitchRunning.value && hasRunOnce.value)
    glitchedText.value = newText

  textToGlitch.value = newText
})

watch(() => isHovered, () => {
  startGlitch()
})

const { startGlitch, glitchedText, textToGlitch, isGlitchRunning, hasRunOnce } = useShuffle()
textToGlitch.value = text

</script>