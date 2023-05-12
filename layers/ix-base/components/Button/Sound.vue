<template lang="pug">
button(@mouseenter="onHover" @click="onClick") 
  slot
</template>

<script lang="ts" setup>
import type { SoundSize } from '~~/composables/useSound';
const { playClick, playHover } = usePlaySound()

const props = defineProps<{
  sound: SoundSize
}>()

const onHover = () => {
  playHover(props.sound)
}

const onClick = () => {
  playClick(props.sound)
}

</script>