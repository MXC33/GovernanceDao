<template lang="pug">
VList(w="full")
  Transition(name="slide-left")
    CollectionFilterButtonContainer(:is-open="isOpen")

  VList.no-scrollbar(max-w="full" w="full" overflow-x="auto")
    table.base-table(bg="gray-900" max-w="full")
      colgroup
        col(v-for="(column, index) in columns" :style="getColumnStyle(column)")

      TableHead()
        template(v-for="(column, index) in columns")
          TableCellHead(:column="column" :index="index" :sort-field="sort" @select-field="selectSortField", @toggle-sort="toggleSortDirection" :drawer="inDrawer" v-if="column.type != 'buttons'") {{ column.label }}
          TableCellHeadWrapper(v-else :drawer="inDrawer") Action


      tbody(divide-y="1")
        TableRow(v-for="(row, index) in sortedRows" :key="index")
          TableCell(v-for="column in columns" pos="on-buttons:(sticky right-0)" :buttons="column.type == 'buttons'") 
            template(v-if="loading")
              HelperSkeleton(h="6")

            template(v-else)
              slot(:name="`item-${column.rowKey}`" :row="row" :column="column" v-if="column.type != 'buttons'")
                TableCellValue(:column="column" :row="row")

              HList(v-else space-x="3" justify="end" w="full")
                slot(name="item-buttons" :buttons="column.buttons" :row="row")
                  TableButton(:row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { TableColumn, TableRow } from '~/composables/useTable';

const { rows, columns, id, colWidth = 200 } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  inDrawer?: boolean,
  loading?: boolean,
  error?: string,
  isOpen?: boolean,
  colWidth?: number
}>()
const { toggleSortDirection, selectSortField, sort } = useTableSort(id)
const { sortRows } = useTable()
const sortedRows = computed(() => sortRows(columns, rows, sort.value))

const getColumnStyle = (item: TableColumn<Row>) => {
  const getStyle = (width: number) => ({
    'width': `${width}px`,
    'min-width': `${width}px`
  })

  if (!item.width)
    return getStyle(colWidth)

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