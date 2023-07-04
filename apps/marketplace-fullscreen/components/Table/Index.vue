<template lang="pug">
VList(w="full" overflow-x="on-slideout:auto" :slideout="slideoutOpen")
  Transition(name="slide-left")
    CollectionFilterButtonContainer(:is-open="isOpen" pos="sticky top-48 md:(sticky top-52)" translate-y="$header-offset" z="99")

  VList.no-scrollbar(max-w="md:full" w="md:full" overflow-x="auto" bg="gray-900" mx="lt-md:-4")
    table.base-table(max-w="full")
      colgroup()
        col(v-if="selectable" :style="{width: `${columnWidth}`}")
        //- col(v-else-if="selectable && isMobile" :style="{width: `${columnWidth}`}")

        col(v-for="column in columns" :style="getColumnStyle(column)")

      TableHeader(v-model="selectedItems" :columns="columns" :rows="sortedRows" :selectable="selectable" :id="id" :context="context")

      TableBody(v-model="selectedItems" :loading="loading" :rows="sortedRows" :columns="columns" :id="id" :selectable="selectable" :context="context")
        template(#[getColumnKey(column)]="{row}" v-for="column in columns")
          slot(:name="`item-${column.rowKey}`" :row="row" v-if="column.type != 'buttons'")
          slot(name="item-buttons" v-else :row="row")

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection';
import type { TableColumn, TableRow } from '~/composables/useTable';

const selectedItems = defineModel<number[]>()

const { getColumnKey } = useTable()

const { isMobile } = useDevice()

const { selectable, columns, isOpen, loading, rows, id, colWidth, context } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  loading?: boolean,
  isOpen?: boolean,
  colWidth?: number,
  selectable?: boolean,
  slideoutOpen?: boolean,
  context?: CollectionContext
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

const columnWidth = computed(() => {
  if (!isMobile.value) {
    switch (context) {
      case 'collection':
        return '48px'
      case 'my-assets':
        return '30px'
      case 'incoming-bids':
        return '48px'
      case 'outgoing-bids':
        return '48px'
      default:
        return '48px'
    }
  } else if (isMobile.value) {
    switch (context) {
      default:
        return '48px'
    }
  }

})

// Add both for mobil 

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