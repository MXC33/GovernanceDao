<template lang="pug">
VList(w="full" max-w="full" min-w="0")
  CollectionFilterButtonContainer(:is-open="isOpen")

  HList.no-scrollbar(overflow-x="on-scrollable:scroll" :scrollable="!!context" w="full" bg="gray-900" ref="scrollElement")
    TableSpacer()

    div.no-scrollbar(grid="~ row-gap-0 gap-x-3" :style="gridStyle" flex-grow="1")

      TableHeader(v-model="selectedItems" :columns="renderColumns" :rows="sortedRows" :id="id" :context="context")

      TableBody(:loading="loading" :rows="sortedRows" :columns="renderColumns" :context="context" :scrolled-past-end="hasScrolledPastEnd" :scrolled-past-start="hasScrolled")
        //- Slots for overriding table column data with template(#item-name="{row}") etc
        template(#[getColumnKey(column)]="{row}" v-for="column in renderColumns")
          slot(:name="`item-${column.rowKey}`" :row="row" v-if="column.type != 'buttons' && column.type != 'asset'")

    TableSpacer()

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection'
import type { TableColumn, TableRow } from '~/composables/useTable'

const selectedItems = defineModel<number[]>()
const scrollElement = ref()
const { getColumnKey } = useTable()

const { arrivedState } = useScroll(scrollElement)

const hasScrolled = computed(() => arrivedState.left == false)
const hasScrolledPastEnd = computed(() => arrivedState.right == false)

watch(arrivedState, (a) => {
  a
})

const { columns, isOpen, loading, rows, id, context } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  loading?: boolean,
  isOpen?: boolean,
  context?: CollectionContext
}>()

const { sort } = useTableSort(id)
const { sortRows } = useTable()
const { isMobile } = useDevice()
const sortedRows = computed(() =>
  sortRows(columns, rows, sort.value)
)

const renderColumns = computed(() => columns.filter((item) =>
  !(isMobile.value && item.hideMobile)
))

const gridStyle = computed(() => {
  const columnStyles = renderColumns.value.map((item) => {
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