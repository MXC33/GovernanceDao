
<template lang="pug">
div()
  table(bg="gray-900" w="full")
    VTableHead()
      VTableCellHead(v-for="item in columns" :item="item") {{ item.label }}

    tbody(divide-y="1")
      VTableRow(v-for="row in sortedRows")
        VTableCell(v-for="item in columns", :key="item.value")
          slot(:name="`item-${item.value}`" :row="row" :column="item" v-if="$slots[`item-${item.value}`]")

          span(v-else) {{row[item.value]}}

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

const { sortedRows } = useTableData(props.rows)

</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>