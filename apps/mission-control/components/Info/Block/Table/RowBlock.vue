<template lang="pug">
div(bg="white !opacity-20 s-active:$mc-accent-20" p="2" color="s-active:$mc-accent s-disabled:gray_light s-accent:$mc-accent s-success:mc-success s-error:mc-error" opacity="s-disabled:50" :state="state" :value="isValue" font="on-value:bold")
  slot
</template>

<script lang="ts" setup>
import type { InfoBlockItem } from '~~/composables/useInfoBlocks';

const state = computed(() =>
  props.isValue ? props.item.valueState ?? props.item.state : props.item.state
)

const props = defineProps<{
  item: InfoBlockItem,
  isValue?: boolean
}>()

</script>