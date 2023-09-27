<template lang="pug">
ButtonSound(tab="~ on-selected:selected" :selected="isSelected" sound="sm-x" uppercase="~" cut="top-right s-sm b-$mc-accent" font="bold" pos="relative top-0.3px" text="xs md:sm" whitespace="nowrap" overflow="hidden")
  slot
</template>

<script lang="ts" setup>

defineProps<{
  isSelected?: boolean
}>()
</script>