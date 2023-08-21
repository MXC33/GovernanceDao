<template lang="pug">
TableCellWrapper(bg="last:gray-900 group-hover:!gray-900" pos="relative s-left:(sticky left-4 md:left-6) s-right:(sticky right-0)" :state="sticky" z="s-left:2 s-right-2" :shaded="sticky" transition="all" min-h="12 md:16" :align-end="lastCol")
  slot

</template>

<script lang="ts" setup>
defineProps<{
  sticky?: 'left' | 'right',
  shadow?: boolean,
  lastCol?: boolean
}>()
</script>