<template lang="pug">
OptionRow(font="400 on-selected:bold" :selected="selected")
  slot

</template>

<script setup lang="ts">
defineProps<{
  selected?: boolean
}>()
</script>