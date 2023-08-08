<template lang="pug">
VList(w="full" max-w="full")
  CollectionFilterButtonContainer(:is-open="isOpen")

  div.no-scrollbar(grid="~ row-gap-0 gap-x-3" max-w="full" w="full" bg="gray-900" overflow-x="on-scrollable:scroll" :style="gridStyle" :scrollable="!!context" ref="scrollElement")

    TableHeader(v-model="selectedItems" :columns="columns" :rows="sortedRows" :id="id" :context="context")

    TableBody(:loading="loading" :rows="sortedRows" :columns="columns"  :context="context" :scrolled-past-end="hasScrolledPastEnd" :scrolled-past-start="hasScrolled")
      //- Slots for overriding table column data with template(#item-name="{row}") etc
      template(#[getColumnKey(column)]="{row}" v-for="column in columns")
        slot(:name="`item-${column.rowKey}`" :row="row" v-if="column.type != 'buttons' && column.type != 'asset'")

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection'
import type { TableColumn, TableRow } from '~/composables/useTable'

const selectedItems = defineModel<number[]>()
const scrollElement = ref()
const { getColumnKey } = useTable()

const { x: scrollX, arrivedState } = useScroll(scrollElement)

const hasScrolled = computed(() => arrivedState.left == false)
const hasScrolledPastEnd = computed(() => arrivedState.right == false)
watch(arrivedState, (a) => {
  console.log("ARRIVE", a)
})
const { selectable, columns, isOpen, loading, rows, id, context } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  loading?: boolean,
  isOpen?: boolean,
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

    if (item.width == 'auto')
      return 'minmax(max-content, auto)'
    else
      return `minmax(${item.width}px, 2fr)`
  }).join(' ')

  return {
    'grid-template-columns': columnStyles
  }
})

</script>

<style scoped></style>