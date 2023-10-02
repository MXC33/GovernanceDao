<template lang="pug">
Logo()
</template>
  
<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations';
import FallbackVue from './Decoration/Fallback.vue';

const props = defineProps<{
  corporation: Corporation,
  filled?: boolean
}>()


const Logo = await import(`../../assets/images/ui/corporations/${props.corporation}/logo${props.filled ? '-filled' : ''}.svg?component`).catch(() => FallbackVue)

</script>
  