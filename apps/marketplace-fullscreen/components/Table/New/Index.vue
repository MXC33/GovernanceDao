<template lang="pug">
VList(w="full" max-w="full")
  CollectionFilterButtonContainer(:is-open="isOpen")

  div.no-scrollbar(grid="~" max-w="full" w="full" bg="gray-900" overflow-x="on-scrollable:scroll" :style="gridStyle" :scrollable="!!context")

    TableNewHeader(v-model="selectedItems" :columns="columns" :rows="sortedRows" :selectable="selectable" :id="id" :context="context")

    TableNewBody(v-model="selectedItems" :loading="loading" :rows="sortedRows" :columns="columns" :selectable="selectable" :context="context")
      template(#[getColumnKey(column)]="{row}" v-for="column in columns")
        slot(:name="`item-${column.rowKey}`" :row="row" v-if="column.type != 'buttons'")
        slot(name="item-buttons" v-else :row="row")


</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection'
import type { TableColumn, TableRow } from '~/composables/useTable'

const selectedItems = defineModel<number[]>()

const { getColumnKey } = useTable()

const { selectable, columns, isOpen, loading, rows, id, colWidth, context } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  loading?: boolean,
  isOpen?: boolean,
  colWidth?: number,
  selectable?: boolean,
  context?: CollectionContext
}>()

const { sort } = useTableSort(id)
const { sortRows } = useTable()

const sortedRows = computed(() =>
  sortRows(columns, rows, sort.value)
)

const gridStyle = computed(() => {
  const columnStyles = columns.map((item) => {
    if (!item.width)
      return 'minmax(150px, 1fr)'
    else
      return `minmax(${item.width}px, 1fr)`
  }).join(' ')

  const selectableStyle = selectable ? '56px ' : ''

  return {
    'grid-template-columns': selectableStyle + columnStyles
  }
})

</script>

<style scoped></style>