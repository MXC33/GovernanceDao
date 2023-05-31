
<template lang="pug">
table(bg="gray-900" w="full")
  colgroup
    col(v-for="column in columns" :style="getColumnStyle(column)")

  TableHead()
    template(v-for="item in columns" )
      TableCellHead(:column="item" :sort-field="sort" @select-field="selectSortField", @toggle-sort="toggleSortDirection" pos="sticky top-50 on-drawer:top-0" :drawer="inDrawer" v-if="item.type != 'buttons'") {{ item.label }}

  tbody(divide-y="1")
    TableRow(v-for="(row, index) in sortedRows" :key="index")
      TableCell(v-for="item in columns") 
        slot(:name="`item-${item.columnId}`" :row="row" :column="item" v-if="item.type != 'buttons'")
          Currency(:value="Number(getValue(item, row))" type="ixt" v-if="item.type == 'ixt'")
          Currency(:value="Number(getValue(item, row))" type="usd" v-else-if="item.type == 'usd'")
          span(v-else-if="item.type == 'date'") {{ getDate(getValue(item, row)) }}
          span(v-else) {{getValue(item, row)}}

        HList(v-else space-x="3" justify="end")
          TableButton(:row="row" :is-primary="button.type == 'primary'" @click="button.onClick(row)"  v-for="button in item.buttons" ) {{ button.text }}



</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { TableColumn, TableRow } from '~/composables/useTable';
import { fromUnixTime } from "date-fns"


const props = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  inDrawer?: boolean,
  loading?: boolean,
  error?: string,
}>()

console.log(props.rows)

const { sortedRows, sort, getValue, selectSortField, toggleSortDirection } = useTable(props.rows, props.columns, props.id)

console.log("TABLE", props)

const getDate = (date: string | number | undefined) =>
  fromUnixTime(Number(date)).toDateString()

const getColumnStyle = (item: TableColumn<Row>) => {
  if (!item.width)
    return {}

  return {
    'width': `${item.width}px`,
    'min-width': `${item.width}px`,
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>