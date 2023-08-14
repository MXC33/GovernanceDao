<template lang="pug">
span(v-if="!isDollar" ref="element") {{ glitchedText }}{{ suffix }}
span(v-else ref="element") {{ suffix }}{{ glitchedText }}

</template>
  
<script lang="ts" setup>
const element = ref()



const { text, isHovered, autoHover } = defineProps<{
  text: string,
  suffix?: string,
  isHovered?: boolean,
  autoHover?: boolean,
  isDollar?: boolean
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