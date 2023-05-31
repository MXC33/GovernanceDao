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

export interface TableButton<T extends TableRow> {
  type: 'primary' | 'secondary',
  text: string,
  onClick: (row: T) => void
}

export interface TableColumnText<T extends TableRow> extends TableColumnBase {
  columnId: TableSortField<T> | string,
  label: string,
  type?: 'text' | 'date' | 'ixt' | 'usd'
  sortable?: boolean,
  getValue?: (row: T) => string | number
}
export interface TableButtonColumn<T extends TableRow> extends TableColumnBase {
  type: 'buttons'
  buttons: TableButton<T>[]
}

export type TableColumn<T extends TableRow> = TableColumnText<T> | TableButtonColumn<T>

interface SortableColumn {
  type?: string,
  columnId: string
}

export const getSortField = (field: SortableColumn) =>
  [field.columnId, field.type].filter(Boolean).join('-')

export const useTableSort = <T extends TableRow>(id: string) => {
  const sort = useState<TableSort<T>>(`table-${id}`, () => ({
    field: 'type',
    direction: 'asc'
  }))

  const toggleSortDirection = () => {
    if (sort.value.direction == 'asc')
      return sort.value.direction = 'desc'
    else return sort.value.direction = 'asc'
  }

  const selectSortField = (field: TableColumnText<T>) => {
    sort.value = {
      direction: 'asc',
      field: getSortField(field)
    }
  }

  return {
    sort,
    selectSortField,
    toggleSortDirection
  }
}

const getDotNotation = (obj: object, key: string) => {
  const getKey = (item: any, key: string) => item[key]
  return key.split('.').reduce(getKey, obj)
}


export const useTable = () => {

  const getValue = <T extends TableRow>(column: TableColumn<T>, row: T) => {
    if (column.type == 'buttons')
      return undefined

    if (column.getValue)
      return column.getValue(row)

    return getDotNotation(row, column.columnId)
  }

  const columnIsSortable = <T extends TableRow>(column: TableColumn<T>): column is TableColumnText<T> =>
    column.type != 'buttons'

  const getSortableColumn = <T extends TableRow>(columns: TableColumn<T>[], columnId: string) =>
    get(columns).find((col) =>
      columnIsSortable(col) && col.columnId == columnId) as TableColumnText<T>

  const sortRows = <T extends TableRow>(columns: TableColumn<T>[], rows: T[], sort: TableSort<T>) => {
    const { field, direction } = sort

    if (!field)
      return rows

    const column = getSortableColumn(columns, field)

    if (!column)
      return rows

    const getField = (row: T) => getValue(column, row) ?? ''

    return rows.sort((a, b) => {
      const aField = getField(a)
      const bField = getField(b)

      return direction === 'asc'
        ? aField < bField
          ? -1 : aField > bField ? 1 : 0
        : aField > bField ? -1 : aField < bField
          ? 1
          : 0;
    });
  }


  return {
    sortRows,
    getValue
  }
}