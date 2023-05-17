<template lang="pug">
div 
  slot

</template>


<script setup lang="ts">
import type { OptionValue } from '~/composables/useDrowdown';

defineProps<{
  isSelected?: boolean,
  isFocused?: boolean,
}>()
</script>