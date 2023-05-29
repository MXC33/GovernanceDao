import { MaybeRef } from 'vue'
import { get } from '@vueuse/core'

export type SortOrder = 'desc' | 'asc'

export interface TableRow extends Record<string, any> { }

export interface TableSort<T extends TableRow> {
  field?: string & keyof T,
  direction: SortOrder
}

export type TableSortField<T extends TableRow> = string & keyof T

interface TableColumnBase {
  type?: string,
  width?: number
}

interface TableButton<T extends TableRow> {
  type: 'primary' | 'secondary',
  text: string,
  onClick: (row: T) => void
}

export interface TableColumnText<T extends TableRow> extends TableColumnBase {
  value: TableSortField<T> | string,
  label: string,
  type?: 'text' | 'ixt' | 'usd'
  sortable?: boolean,
}
export interface TableButtonColumn<T extends TableRow> extends TableColumnBase {
  type: 'buttons'
  buttons: TableButton<T>[]
}

export type TableColumn<T extends TableRow> = TableColumnText<T> | TableButtonColumn<T>

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
    sort.value = {
      direction: 'asc',
      field: field
    }
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
    sort,
    toggleSortDirection,
    selectSortField,
    sortedRows
  }
}