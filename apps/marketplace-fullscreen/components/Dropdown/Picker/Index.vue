<template lang="pug">
VList(justify="center" items="center" aspect="2/3" bg="black opacity-40")

</template>
  
<script lang="ts" setup>
import type { OptionValue } from '~/composables/useDrowdown';


const props = defineProps<{
  item?: OptionValue
}>()

</script>