<template lang="pug">
HList(bg="gray-800" flex-shrink="0" min-w="full" w="full")
  HList(bg="gray-900" z="3" font="400" color="gray-200" whitespace="nowrap" pos="sticky top-0" items="center" w="full" max-w="full")

    HList(min-h="49px" flex-shrink="0" items="center" b="b-1 gray-600" p="t-2 b-2 l-4 r-4 md:(t-3 b-3 l-6 r-6)")
      InputCheckbox(v-if="selectable" :model-value="allSelected" @update:modelValue="onSelectAll" :space-false="true")

    template(v-for="(column, index) in columns")
      HList(v-if="column.type == 'buttons' && !isMobile" min-w="250px" max-w="full" items="center" b="b-1 gray-600" p="t-3 b-3 r-6") {{ $t('general.action') }}

      TableNewCell(v-else-if="column.type == 'buttons'" p="t-3 b-3 r-4" :is-open="isMenuOpen" :is-neutral="true" :is-button="true") {{ $t('general.action') }}

      TableNewCellHead(v-else :column="column" :index="index" :sortField="sort" @select-field="onClickSort", @toggle-sort="onClickToggle" :context="context") {{ column.label }}


</template>

<script lang="ts" setup generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection'
import type { ServerTableSort, TableColumn, TableRow, TableSortable } from '~/composables/useTable'

const { selectable, rows, columns, id, isButton, isOpen } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  selectable?: boolean,
  context?: CollectionContext
  isButton?: boolean
  isOpen?: boolean
}>()

const { isMobile } = useDevice()

const selectedItems = defineModel<number[]>()

const openRows = ref<number[]>([])

const isMenuOpen = computed(() => {
  return selectedItems.value ? selectedItems.value.length > 0 : false
});


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