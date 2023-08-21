
<template lang="pug">
HList.table-cell-item(p="y-2" whitespace="nowrap" pos="relative" items="center" w="full" min-w="0")
  .table-cell-bg(b="b-1 gray-600" bg="on-has-bg:!gray-900" pos="absolute bottom-0 top-0 left-0 right-0" mx="lg:-3 -3" :has-bg="hasBg")

  HList(pos="relative" w="full" min-w="0" justify="on-end:end" :end="alignEnd")
    slot

      
</template>

<script setup lang="ts">
defineProps<{
  alignEnd?: boolean,
  hasBg?: boolean
}>()
</script>

<style>
.table-row-item:hover .table-cell-bg {
  background: #1A1A1A;
}

.table-row-item .table-cell-item:first-child .table-cell-bg {
  margin-left: -1.5rem;
}

.table-row-item .table-cell-item:last-child .table-cell-bg {
  margin-right: -1.5rem;
}

@media (max-width: 767.9px) {
  .table-row-item .table-cell-item:last-child .table-cell-bg {
    margin-right: -1rem;
  }
}
</style>