
<template lang="pug">
th(p="3")
  button(v-if="column.sortable" @click="onClickSort" flex="~ row" items="start" opacity="50 hover:75 on-active:100" :active="isActive" transition="all")
    HList()
      slot
      Transition(name="fade" mode="out-in")
        UpArrowIcon.icon(v-if="direction == 'desc'")
        DownArrowIcon.icon(v-else)

  HList(v-else items="start")
    slot
      
</template>

<script setup lang="ts" generic="T extends TableRow">
import UpArrowIcon from '../icons/UpArrowIcon.vue';
import DownArrowIcon from '../icons/DownArrowIcon.vue';
import type { TableColumn, TableRow, TableSort, TableSortField } from '~/composables/useTable';


const props = defineProps<{
  column: TableColumn<T>,
  sortField?: TableSort<T>
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