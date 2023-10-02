<template lang="pug">
VList(max-w="20 sm:25 lg:35" w="full" cut="bottom-right b-$mc-accent")
  SenderVideo(:sender="sender" type="square")

</template>

<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations';

const props = defineProps<{
  corporation: Corporation
}>()

const sender = computed(() => {
  switch (props.corporation) {
    case 'eternalab': return 'eve-pryde'
    case 'new-lands': return 'jeremiah'
    case 'gws': return 'buck'
    case 'lucky-cat': return 'seina'
    case 'y-space': return 'mayflower'
    case 'astro-cap': return 'mmi-das'
    case 'gravity-grade': return 'wp5813'
    case 'haveblue': return 'ascella-of-the-rain'
  }
})
</script>