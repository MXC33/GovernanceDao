<template lang="pug">
ButtonSound(tab="~ on-selected:selected" :selected="isSelected" sound="sm-x" uppercase="~" cut="top-right s-sm b-$mc-accent" font="bold")
  slot
</template>

<script lang="ts" setup>

defineProps<{
  isSelected?: boolean
}>()
</script>