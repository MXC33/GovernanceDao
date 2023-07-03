<template lang="pug">
VList()
  CollectionFilterButtonContainer(:is-open="isOpen" pos="sticky top-42 md:(sticky top-52)" translate-y="$header-offset" z="99")

  div.grid(grid="~ cols-2 md:(cols-3 on-open:cols-1) xl:(cols-4 on-open:cols-3) 2xl:(cols-5 on-open:cols-4)" :open="isOpen" :state="gridState" w="full")
    slot

</template>

<script lang="ts" setup>
const { isOpen } = defineProps<{
  isOpen: boolean
}>()

const { device } = useDevice()

const gridState = computed(() => {
  const open = isOpen ? '-open' : ''
  return `${device.value}${open}`
})

</script>

<style>
.collection-grid-item {
  border-left: 0.5px solid #636363;
}

.collection-grid-item:first-child,
.grid[state~="4k"] .collection-grid-item:nth-child(5n + 1),
.grid[state~="4k-open"] .collection-grid-item:nth-child(4n + 1),
.grid[state~="desktop"] .collection-grid-item:nth-child(4n + 1),
.grid[state~="desktop-open"] .collection-grid-item:nth-child(3n + 1),
.grid[state~="tablet"] .collection-grid-item:nth-child(3n + 1),
.grid[state~="tablet-open"] .collection-grid-item,
.grid[state~="mobile"] .collection-grid-item:nth-child(2n + 1),
.grid[state~="mobile-open"] .collection-grid-item:nth-child(2n + 1) {
  border-left: none;
}
</style>