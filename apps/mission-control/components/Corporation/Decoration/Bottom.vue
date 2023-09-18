<template lang="pug">
DecorationBottom.corporation-decoration()

</template>

<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations'
import FallbackVue from './Fallback.vue';

const id = useActiveCorporation()

const DecorationBottom = await import(`../../../assets/images/ui/corporations/${id.value}/decro-b.svg?component`).catch(() => FallbackVue)

</script>
