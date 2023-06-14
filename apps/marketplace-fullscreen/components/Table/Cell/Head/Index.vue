
<template lang="pug">
TableCellHeadWrapper()
  HList(v-if="column.sortable" cursor="pointer" space-x="1"  @click="onClickSort" flex="~ row" items="start" color="on-active:white" :active="isActive" transition="all")
    div()
      slot

    Transition(name="fade" mode="out-in")
      SortIcon(v-if="!isActive" w="4")
      HelperChevron(:up="direction == 'desc'" w="4" :thick="true" v-else)

  HList(v-else items="start")
    slot
      
</template>

<script setup lang="ts" generic="T extends TableRow">
import SortIcon from '~/assets/icons/sort.svg'
import type { TableSortable, TableRow, TableSort } from '~/composables/useTable'

const { sortField, index, column } = defineProps<{
  column: TableSortable,
  index: number,
  sortField?: TableSort,
}>()

const emit = defineEmits<{
  toggleSort: [TableSortable, number],
  selectField: [TableSortable, number]
}>()

const isActive = computed(() => sortField?.columnIndex == index)

const direction = computed(() => {
  if (isActive.value)
    return sortField?.direction

  return 'asc'
})

const onClickSort = () => {
  if (isActive.value)
    return emit("toggleSort", column, index)

  return emit("selectField", column, index)
}

</script>

<style scoped></style>