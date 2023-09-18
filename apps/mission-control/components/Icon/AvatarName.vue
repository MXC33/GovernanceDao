<template lang="pug">
img(:src="`/popup/name/${sender}.png`")
</template>

<script lang="ts" setup>
import type { Sender } from '~~/composables/useSender';

defineProps<{
  sender: Sender
}>()

</script>