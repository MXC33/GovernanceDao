<template lang="pug">
template(v-for="(column, index) in columns")
  template(v-if="!(isMobile && column.hideMobile)")
    TableCellHeadWrapper(v-if="column.type == 'buttons'" :is-open="isMenuOpen") {{ $t('general.action') }}

    TableCellHead(v-else :column="column" :index="index" :sortField="sort" @select-field="onClickSort", @toggle-sort="onClickToggle" :last-col="index == columns.length - 1") 
      InputCheckbox(v-model="selectAllChecked" v-if="column.type == 'asset' && !column.disableSelect")

      div {{ column.label }}

</template>

<script lang="ts" setup generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection'
import type { ServerTableSort, TableColumn, TableRow, TableSortable } from '~/composables/useTable'

const { isMobile } = useDevice()

const { rows, columns, id } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  context?: CollectionContext
}>()

const selectedItems = defineModel<number[]>()

const isMenuOpen = computed(() => {
  return selectedItems.value ? selectedItems.value.length > 0 : false
})

const isAllSelected = computed(() =>
  (selectedItems.value ?? []).length == rows.length && rows.length > 0
)

const selectAllChecked = computed({
  get: () =>
    isAllSelected.value
  ,
  set: (selected: boolean) => {
    if (!selected)
      return selectedItems.value = []
    else
      return selectedItems.value = rows.map((_, index) => index)
  }
})

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