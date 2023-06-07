<template lang="pug">
VList(w="full")
  Transition(name="slide-left")
    CollectionFilterButtonContainer(:is-open="isOpen")

  VList(max-w="full" overflow-x="auto" w="full")

    table(bg="gray-900")
      //- colgroup
      //-   col(v-for="(column, index) in columns" :style="getColumnStyle(column)")

      TableHead()
        template(v-for="(column, index) in columns")
          TableCellHead(:column="column" :index="index" :sort-field="sort" @select-field="selectSortField", @toggle-sort="toggleSortDirection" pos="sticky top-(-0.2)" :drawer="inDrawer" v-if="column.type != 'buttons'") {{ column.label }}

      tbody(divide-y="1")
        TableRow(v-for="(row, index) in sortedRows" :key="index")
          TableCell(v-for="column in columns" pos="on-buttons:(sticky right-0)" :buttons="column.type == 'buttons'") 
            slot(:name="`item-${column.rowKey}`" :row="row" :column="column" v-if="column.type != 'buttons'")
              TableCellValue(:column="column" :row="row")

            HList(v-else space-x="3" justify="end" w="full")
              slot(name="item-buttons" :buttons="column.buttons" :row="row")
                TableButton(:row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { TableColumn, TableRow } from '~/composables/useTable';

const { rows, columns, id } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  inDrawer?: boolean,
  loading?: boolean,
  error?: string,
  isOpen?: boolean
}>()

const { toggleSortDirection, selectSortField, sort } = useTableSort(id)
const { sortRows } = useTable()
const sortedRows = computed(() => sortRows(columns, rows, sort.value))

// const getColumnStyle = (item: TableColumn<Row>) => {
//   if (!item.width)
//     return {}

//   return {
//     'width': `${item.width}px`,
//     'min-width': `${item.width}px`,
//   }
// }

</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>