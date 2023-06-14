<template lang="pug">
VList(w="full")
  Transition(name="slide-left")
    CollectionFilterButtonContainer(:is-open="isOpen")

  VList.no-scrollbar(max-w="full" w="full" overflow-x="auto" bg="gray-900")
    table.base-table(max-w="full")
      colgroup()
        col(v-for="column in displayColumns" :style="getColumnStyle(column)")

      TableHead()
        template(v-for="(column, index) in displayColumns")
          TableCellHeadWrapper(v-if="column.type == 'buttons'") {{ $t('general.action') }}

          TableCellHeadWrapper(v-else-if="column.type == 'select'") 
            InputCheckbox(:model-value="allSelected" @update:modelValue="onSelectAll")

          TableCellHead(v-else :column="column" :index="index" :sortField="sort" @select-field="onClickSort", @toggle-sort="onClickToggle" ) {{ column.label }}

      tbody(divide-y="1")
        TableRow(v-for="(row, index) in sortedRows" :key="index")
          TableCell(v-for="column in displayColumns" pos="on-buttons:(sticky right-0)" :buttons="column.type == 'buttons'") 
            template(v-if="loading")
              HelperSkeleton(h="6")

            template(v-else)
              div(v-if="column.type == 'select'")
                InputCheckbox(:model-value="isSelected(index)")

              HList(v-else-if="column.type == 'buttons'" space-x="3" justify="end" w="full")
                slot(name="item-buttons" :buttons="column.buttons" :row="row")
                  TableButton(:row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

              slot(v-else :name="`item-${column.rowKey}`" :row="row" :column="column" )
                TableCellValue(:column="column" :row="row")

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { ServerTableSort, TableColumn, TableRow, TableSortable } from '~/composables/useTable';

const props = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  id: string,
  inDrawer?: boolean,
  loading?: boolean,
  error?: string,
  isOpen?: boolean,
  colWidth?: number,
  selectable?: boolean
}>()

const selectedItems = defineModel<number[]>()

const isSelected = (index: number) => selectedItems.value?.includes(index)

const allSelected = computed(() =>
  (selectedItems.value ?? []).length == props.rows.length
)

const onSelectAll = () => {
  const mapMan = props.rows.map((item, index) => index)
  selectedItems.value = mapMan
  console.log("SELECT", selectedItems.value, mapMan)
}

const emit = defineEmits<{
  selectAll: [boolean]
}>()

const selectAll = ref(false)
watch(selectAll, (val) => emit("selectAll", val))

const { toggleSortDirection, selectSortField, sort, isServerSort } = useTableSort(props.id)

const { activeServerSort, } = useCollectionSettings()

const { sortRows } = useTable()

const displayColumns = computed(() => {
  if (!props.columns)
    return []

  if (!props.selectable)
    return props.columns

  const selectColumn: TableColumn<Row> = {
    type: 'select',
    width: 80
  }

  if (props.selectable)
    return [selectColumn, ...props.columns]
})

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


const sortedRows = computed(() => sortRows(props.columns, props.rows, sort.value))

const isMobile = onMobile()
const getColumnStyle = (item: TableColumn<Row>) => {
  const getStyle = (width: number) => ({
    'width': `${width}px`,
    'min-width': `${width}px`
  })

  if (!item.width)
    return getStyle(props.colWidth ?? isMobile.value ? 150 : 200)

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