<template lang="pug">
div(b="$mc-accent-60" px="2" py="2" text="ellipsis") {{ column.value }}

</template>

<script lang="ts" setup>
import type { InfoBlockValue } from '~~/composables/useInfoBlocks';

const props = defineProps<{
  column: InfoBlockValue,
}>()

</script>