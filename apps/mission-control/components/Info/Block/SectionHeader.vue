<template lang="pug">
InfoHeader(mb="2") {{  block.title }}
  
</template>
  
<script lang="ts" setup>
import type { InfoBlockSectionHeader } from '~~/composables/useInfoBlocks';

defineProps<{
  block: InfoBlockSectionHeader,
}>()

</script>