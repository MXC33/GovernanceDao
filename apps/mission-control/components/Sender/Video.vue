<template lang="pug">
video(:src="url" autoplay loop playsinline muted)
</template>

<script lang="ts" setup>
import type { Sender } from '~~/composables/useSender';


const props = defineProps<{
  type: 'wide' | 'square'
  sender: Sender
}>()

const url = computed(() => `/popup/${props.type}/${props.sender}.mp4`)

</script>