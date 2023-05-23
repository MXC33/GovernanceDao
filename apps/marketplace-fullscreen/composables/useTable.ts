import { MaybeRef } from 'vue'
import { get } from '@vueuse/core'

export type SortOrder = 'desc' | 'asc'

export interface TableRow extends Record<string, any> { }

export interface TableSort<T extends TableRow> {
  field?: string & keyof T,
  direction: SortOrder
}

export type TableSortField<T extends TableRow> = string & keyof T

export interface TableColumn<T extends TableRow> {
  value: TableSortField<T>,
  label: string,
  sortable?: boolean,
  width?: number
}

export const useTable = <T extends TableRow>(rows: MaybeRef<T[]>, id: string) => {
  const sort = useState<TableSort<T>>(`table-${id}`, () => ({
    field: 'type',
    direction: 'asc'
  }))

  const toggleSortDirection = () => {
    if (sort.value.direction == 'asc')
      return sort.value.direction = 'desc'
    else return sort.value.direction = 'asc'
  }

  const selectSortField = (field: TableSortField<T>) => {
    sort.value.direction = 'asc'
    sort.value.field = field
  }

  const sortedRows = computed(() => {
    const data = get(rows)
    const { field, direction } = sort.value

    const dataField: keyof T = field ?? 'type'
    const getField = (row: T) => row[dataField] ?? ""

    return data.sort((a, b) => {
      const aField = getField(a)
      const bField = getField(b)
      return direction === 'asc'
        ? aField < bField
          ? -1 : aField > bField ? 1 : 0
        : aField > bField ? -1 : aField < bField
          ? 1
          : 0;
    });
  })


  return {
    toggleSortDirection,
    selectSortField,
    sortedRows
  }
}