import { MaybeRef } from 'vue'
import { get } from '@vueuse/core'

export type SortOrder = 'desc' | 'asc'

export interface TableRow extends Record<string, any> { }

export interface TableSort {
  columnIndex: number,
  direction: SortOrder
}

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
  columnId: string,
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


export const useTableSort = (id: string) => {
  const sort = useState<TableSort>(`table-${id}`, () => ({
    columnIndex: 0,
    direction: 'asc'
  }))

  const toggleSortDirection = () => {
    if (sort.value.direction == 'asc')
      return sort.value.direction = 'desc'
    else return sort.value.direction = 'asc'
  }

  const selectSortField = (columnIndex: number) => {
    sort.value = {
      direction: 'asc',
      columnIndex
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

  const sortRows = <T extends TableRow>(columns: TableColumn<T>[], rows: T[], sort: TableSort) => {
    const { columnIndex, direction } = sort
    const column = columns[columnIndex]
    if (!column)
      return

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