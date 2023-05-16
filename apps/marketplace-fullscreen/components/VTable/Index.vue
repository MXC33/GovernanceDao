
<template lang="pug">

table(bg="gray-900" w="full")
  colgroup
    col(v-for="column in columns" :style="getColumnStyle(column)")

  VTableHead()
    VTableCellHead(v-for="item in columns" :item="item") {{ item.label }}

  tbody(divide-y="1")
    VTableRow(v-for="(row, index) in sortedRows" :key="index")
      VTableCell(v-for="item in columns", :key="item.value")
        slot(:name="`item-${item.value}`" :row="row" :column="item" v-if="$slots[`item-${item.value}`]")

        span() {{row[item.value]}}

</template>

<script setup lang="ts">
import type { CollectionItem, SortField } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable';

const props = defineProps<{
  columns: TableColumn[],
  rows: CollectionItem[],
  initialSort: SortField,
  loading?: boolean,
  error?: string,
}>()

const getColumnStyle = (item: TableColumn) => {
  if (!item.width)
    return {}

  return {
    'width': `${item.width}px`,
    'min-width': `${item.width}px`,
  }
}

const { sortedRows } = useTableData(props.rows)
watch(sortedRows, (da) => {
  console.log("Newsort", da)
}, { immediate: true, deep: true })
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>