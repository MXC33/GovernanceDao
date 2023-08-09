<template lang="pug">
TableCellWrapper(bg="last:gray-900 group-hover:!gray-800" pos="relative on-sticky:sticky right-0" shadow="on-shaded:left" :sticky="sticky" :shaded="sticky && shadow" transition="all" :align-end="lastCol")
  slot

</template>

<script lang="ts" setup>
defineProps<{
  sticky?: boolean,
  shadow?: boolean,
  lastCol?: boolean
}>()
</script>