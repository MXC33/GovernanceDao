
<template lang="pug">
div()
  table(bg="gray-900")
    VTableHead()
      VTableCellHead(v-for="item in columns", :key="item.value", :sortable="item.sortable", :active="item.value === state.sort.field", :asc="state.sort.direction === 'asc'", @sort="updateOrder(item.value)") {{item.label}}

    tbody()
      VTableRow(v-for="row in page")
        VTableCell(v-for="item in columns", :key="item.value")
          slot(:name="`item-${item.value}`" :row="row" :column="item" v-if="$slots[`item-${item.value}`]")

          span(v-else) {{row[item.value]}}

  VTablePagination(
    :current-page="state.currentPage"
    :per-page="state.perPage"
    :total-pages="Math.ceil(rows.length / state.perPage)"
    @perpage="perPageChange"
    @prevpage="prevPage"
    @nextpage="nextPage")

</template>

<script setup lang="ts" generic="Row extends object, Key extends string & keyof Row">
import { get } from '@vueuse/core'


const props = defineProps<{
  columns: Column[],
  rows: Row[],
  initialSort: Key,
  loading?: boolean,
  error?: string,
}>()

type SortOrder = 'desc' | 'asc'

interface Column {
  value: Key,
  label: string,
  sortable?: boolean,
  width?: number
}

interface TableSettings {
  sort: {
    field: Key,
    direction: SortOrder
  },
  perPage: number,
  currentPage: number,
}

const state = useState<TableSettings>('table-sort', () => ({
  sort: {
    field: props.initialSort,
    direction: 'asc'
  },
  perPage: 50,
  currentPage: 1
} as TableSettings))

const sorted = computed(() => {
  const { rows } = props
  const { field, direction } = get(state.value).sort

  return rows.sort((a, b) => {
    return direction === 'asc'
      ? a[field] < b[field]
        ? -1
        : a[field] > b[field]
          ? 1
          : 0
      : a[field] > b[field]
        ? -1
        : a[field] < b[field]
          ? 1
          : 0;
  });
})

const page = computed(() => {
  const { perPage, currentPage } = state.value
  return sorted.value.slice((currentPage - 1) * perPage, currentPage * perPage);
});

const updateOrder = (field: Key) => {
  const { sort } = state.value
  if (sort.field === field) {
    state.value.sort.direction = sort.direction === 'desc' ? 'asc' : 'desc';
  } else {
    state.value.sort.field = field
    state.value.sort.direction = 'desc';
  }
}

const prevPage = () => {
  if (state.value.currentPage > 1)
    state.value.currentPage--
}
const nextPage = () => {
  if (state.value.currentPage < props.rows.length / state.value.perPage)
    state.value.currentPage++
}
const perPageChange = (perPage: number) => {
  if (perPage === 0) {
    state.value.perPage = props.rows.length
  } else {
    state.value.perPage = perPage
  }
  state.value.currentPage = 1
}

</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
</style>