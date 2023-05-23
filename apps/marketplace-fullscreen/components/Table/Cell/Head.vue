
<template lang="pug">
th(p="3" bg="gray-900")
  button(v-if="column.sortable" @click="onClickSort" flex="~ row" items="start" opacity="50 hover:75 on-active:100" :active="isActive" transition="all")
    HList()
      slot
      Transition(name="fade" mode="out-in")
        ArrowIcon(rotate="on-up:-180deg" :up="direction == 'desc'" transition="all")

  HList(v-else items="start")
    slot
      
</template>

<script setup lang="ts" generic="T extends TableRow">
import ArrowIcon from '../icons/UpArrowIcon.vue'
import type { TableColumn, TableRow, TableSort, TableSortField } from '~/composables/useTable'

const props = defineProps<{
  column: TableColumn<T>,
  sortField?: TableSort<T>,
}>()

const emit = defineEmits<{
  toggleSort: [],
  selectField: [item: TableSortField<T>]
}>()

const isActive = computed(() => props.sortField?.field == props.column.value)

const direction = computed(() => {
  if (isActive.value)
    return props.sortField?.direction

  return 'asc'
})

const onClickSort = () => {
  if (isActive.value)
    return emit("toggleSort")

  return emit("selectField", props.column.value)
}

</script>

<style scoped></style>