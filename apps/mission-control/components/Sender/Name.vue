<template lang="pug">
div {{ name }}

</template>

<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations'
import type { Sender } from '~~/composables/useSender';

const props = defineProps<{
  id: Corporation | Sender
}>()

const name = computed(() => {
  switch (props.id) {
    case 'new-lands':
    case 'jeremiah':
      return 'Jeremiah Galahad / Architect'

    case 'y-space':
    case 'mayflower':
      return 'MAYFLOWER / PA. 314'

    case 'eternalab':
    case 'eve-pryde':
      return 'Eve Pryde / Director'

    case 'lucky-cat':
    case 'seina':
      return 'Seina / Promoter'

    case 'gws':
    case 'buck':
      return 'Buck / Collector'

    case 'astro-cap':
    case 'mmi-das':
      return 'MMI–DAS / CLERK'

    case 'proxy-of-change':
      return 'Proxy of Change'

    case 'gravity-grade':
    case 'wp5813':
      return 'WP5813 / POSTBOT'

    case 'haveblue':
      return 'Ascella of The Rain / Assembler'
  }
})

</script>