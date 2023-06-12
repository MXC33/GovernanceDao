<template lang="pug">
span(ref="element") {{ glitchedText }}{{  suffix }}

</template>
  
<script lang="ts" setup>
const element = ref()



const { text, isHovered, autoHover } = defineProps<{
  text: string,
  suffix?: string,
  isHovered?: boolean,
  autoHover?: boolean
}>()

if (autoHover) {
  const isHovering = useElementHover(element)
  watch(isHovering, () => {
    startGlitch()
  })
}

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