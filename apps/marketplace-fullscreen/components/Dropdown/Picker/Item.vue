<template lang="pug">
VList() {{ item?.name }}
</template>
  
<script lang="ts" setup>
import type { OptionValue } from '~/composables/useDrowdown';

defineProps<{
  item?: OptionValue
}>()

</script>