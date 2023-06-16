<template lang="pug">
TableHeaderWrapper()

  TableCellHeadWrapper(v-if="selectable") 
    InputCheckbox(:model-value="allSelected" @update:modelValue="onSelectAll")

  template(v-for="(column, index) in columns")
    TableCellHeadWrapper(v-if="column.type == 'buttons'") {{ $t('general.action') }}

    TableCellHead(v-else :column="column" :index="index" :sortField="sort" @select-field="onClickSort", @toggle-sort="onClickToggle" ) {{ column.label }}

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { ServerTableSort, TableColumn, TableRow, TableSortable } from '~/composables/useTable';


const { selectable, rows, columns, id } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  selectable?: boolean,
}>()

const selectedItems = defineModel<number[]>()

const allSelected = computed(() =>
  (selectedItems.value ?? []).length == rows.length && rows.length > 0
)

const onSelectAll = () => {
  if (allSelected.value)
    return selectedItems.value = []

  selectedItems.value = rows.map((_, index) => index)
}

const { toggleSortDirection, selectSortField, sort, isServerSort } = useTableSort(id)

const { activeServerSort } = useCollectionSettings()

const onClickToggle = ({ sortable }: TableSortable, columnIndex: number) => {
  toggleSortDirection()

  if (!isServerSort(sortable))
    return

  if (sortable.ascKey && sort.value.direction == 'asc')
    return activeServerSort.value = sortable.ascKey

  if (sortable.descKey && sort.value.direction == 'desc')
    return activeServerSort.value = sortable.descKey

}
const onClickSort = (column: TableSortable, columnIndex: number) => {
  const serverAscKey = (column.sortable as ServerTableSort)?.ascKey

  selectSortField(columnIndex, 'asc', serverAscKey)
}


</script>
