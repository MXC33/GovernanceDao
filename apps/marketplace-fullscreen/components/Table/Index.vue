
<template lang="pug">
table(bg="gray-900" w="full")
  colgroup
    col(v-for="column in columns" :style="getColumnStyle(column)")

  TableHead()
    TableCellHead(v-for="item in columns" :column="item" :sort-field="sort" @select-field="selectSortField", @toggle-sort="toggleSortDirection" pos="sticky top-50 on-drawer:top-12" :drawer="inDrawer") {{ item.label }}

  tbody(divide-y="1")
    TableRow(v-for="(row, index) in sortedRows" :key="index")
      TableCell(v-for="item in columns", :key="item.value")
        slot(:name="`item-${item.value}`" :row="row" :column="item")
          Currency(:value="row[item.value]" type="ixt" v-if="item.type == 'ixt'")
          Currency(:value="row[item.value]" type="usd" v-else-if="item.type == 'usd'")
          span(v-else) {{row[item.value]}}

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { TableColumn, TableRow } from '~/composables/useTable';

const props = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  inDrawer?: boolean,
  loading?: boolean,
  error?: string,
}>()

const { sortedRows, sort, selectSortField, toggleSortDirection } = useTable(props.rows, props.id)

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