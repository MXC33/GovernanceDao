<template lang="pug">
VList(w="full")
  Transition(name="slide-left")
    CollectionFilterButtonContainer(:is-open="isOpen")

  VList.no-scrollbar(max-w="full" w="full" overflow-x="auto" bg="gray-900")
    table.base-table(max-w="full")
      colgroup()
        col(v-if="selectable", :style="{width: '80px'}")
        col(v-for="column in columns" :style="getColumnStyle(column)")

      TableHeader(v-model="selectedItems" :columns="columns" :rows="rows" :selectable="selectable" :id="id")

      TableBody(v-model="selectedItems" :loading="loading" :rows="sortedRows" :columns="columns" :id="id" :selectable="selectable")

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { TableColumn, TableRow } from '~/composables/useTable';

const selectedItems = defineModel<number[]>()
const isMobile = onMobile()

const { selectable, columns, isOpen, loading, rows, id, colWidth } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  loading?: boolean,
  isOpen?: boolean,
  colWidth?: number,
  selectable?: boolean,
}>()

const { sort } = useTableSort(id)
const { sortRows } = useTable()

const sortedRows = computed(() =>
  sortRows(columns, rows, sort.value)
)

const getColumnStyle = (item: TableColumn<Row>) => {
  const getStyle = (width: number) => ({
    'width': `${width}px`,
    'min-width': `${width}px`
  })

  if (!item.width)
    return getStyle(colWidth ?? isMobile.value ? 150 : 200)

  return getStyle(item.width)
}

</script>

<style scoped>
table {
  display: table;
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
  overflow-x: auto;
}
</style>