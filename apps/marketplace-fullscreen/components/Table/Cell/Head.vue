
<template lang="pug">
th(p="3 first:l-6 last:r-6" bg="gray-900" z="3" font="400" color="gray-200")
  button(v-if="column.sortable" @click="onClickSort" flex="~ row" items="start" color="on-active:white" :active="isActive" transition="all")
    HList(space-x="1")
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
import type { TableColumnText, TableRow, TableSort, TableSortField } from '~/composables/useTable'

const props = defineProps<{
  column: TableColumnText<T>,
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