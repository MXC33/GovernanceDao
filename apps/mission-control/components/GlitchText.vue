<template lang="pug">
div(@click="skipGlitch = true" pos="relative")
  ClientOnly
    transition(name="fade")
      div(ref="glitchMe" pos="absolute" w="full" h="full" v-if="!skipGlitch") {{ glitchedText }}
      div(v-else) {{ text }}
  div(opacity="0" v-if="!skipGlitch") {{ text }}
</template>

<script lang="ts" setup>
const glitchMe = ref()
const skipGlitch = ref(false)

const props = defineProps<{
  text: string,
  hover?: boolean,
  transformText?: string,
  manualHover?: boolean
}>()

watch(() => props.text, (newText, oldText) => {
  if (newText == oldText)
    return

  if (!isGlitchRunning.value && hasRunOnce.value)
    glitchedText.value = newText

  textToGlitch.value = newText
  skipGlitch.value = false
})


const { glitchedText, textToGlitch, isGlitchRunning, hasRunOnce } = useShuffle()

textToGlitch.value = props.text

</script>