<template lang="pug">
VList() {{ item?.name }}
</template>
  
<script lang="ts" setup>
import type { OptionValue } from '~/composables/useDrowdown';

const props = defineProps<{
  item?: OptionValue
}>()

</script>