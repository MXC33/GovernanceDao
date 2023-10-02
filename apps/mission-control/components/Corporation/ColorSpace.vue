<template lang="pug">
.corporation(:class="[`corporation-${corporation}`]") 
  slot
</template>
  
<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations';

defineProps<{
  corporation: Corporation,
}>()

</script>