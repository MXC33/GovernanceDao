<template lang="pug">
VList(w="full" max-w="full" overflow-x="scroll")
  CollectionFilterButtonContainer(:is-open="isOpen")

  VList.no-scrollbar(max-w="full" w="full" bg="gray-900" overflow-x="scroll")

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

</script>

<style scoped></style>