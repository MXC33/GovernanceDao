import { camelCaseIt } from 'case-it';

export type SortOrder = 'desc' | 'asc'

export interface TableRow extends Record<string, any> { }

export const ServerSortOptions = {
  PRICE_ASC: 0,
  LATEST_LISTED: 1,
  LATEST_SOLD: 2,
  ENDING_SOON: 3,
  HIGHEST_LAST_SALE_PRICE: 4,
  FAVORITES: 5,
  PRICE_DESC: 6,
  HIGHEST_DAILY_YIELD: 7,
  RECENTLY_MINTED: 8
} as const

export type ServerSortKey = keyof typeof ServerSortOptions

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
  text?: string,
  icon?: 'cart',
  onClick: (row: T) => void
}

export interface TableSortable {
  sortable?: ServerTableSort | boolean
}

export interface TableColumnText<T extends TableRow> extends TableColumnBase, TableSortable {
  label: string,
  type?: 'text' | 'date' | 'ixt' | 'usd' | 'asset' | 'contractAdress'
  rowKey?: string,
  getValue?: (row: T) => string | number
}

export interface ServerTableSort {
  ascKey: ServerSortKey,
  descKey: ServerSortKey
}

export interface TableColumnAsset extends TableColumnBase, TableSortable {
  label: string,
  type?: 'asset'
}

export interface TableButtonColumn<T extends TableRow> extends TableColumnBase {
  type: 'buttons'
  buttons?: TableButton<T>[]
}

export type TableColumn<T extends TableRow> = TableColumnText<T> | TableButtonColumn<T>

const columnIndex = (id: string) => {
  const colIndexOne = ['collection', 'incoming-bids', 'outgoing-bids', 'my-assets', 'active-listings']

  if (colIndexOne.includes(id))
    return 1

  if (id == 'activity')
    return 6

  return 0
}

export const useTableSort = (id: string) => {
  type SortableColumn = ReturnType<typeof getServerSortableColumns>[number]

  const { isTextColumn } = useTable()

  const isDescendingDirection = id == 'offers' || id == 'incoming-bids' || id == 'activity'

  const sort = useState<TableSort>(`table-${id}`, () => (
    {
      columnIndex: columnIndex(id),
      direction: isDescendingDirection ? 'desc' : 'asc'
    }))

  const serverSortOptions = useState<SortableColumn[]>(`collection-sort-options`, () => [])

  const setupSortOptions = <T extends TableRow>(columns: TableColumn<T>[]) => {
    serverSortOptions.value = getServerSortableColumns(columns)
  }

  const selectedSortOption = computed(() =>
    serverSortOptions.value.find((item) =>
      item.columnIndex == sort.value.columnIndex
    )
  )

  const isServerSort = (sortable?: Boolean | ServerTableSort): sortable is ServerTableSort => {
    const serverSort = (sortable as ServerTableSort)
    return !!(serverSort?.ascKey || serverSort?.descKey)
  }

  const getServerSortableColumns = <T extends TableRow>(columns: TableColumn<T>[]) =>
    columns
      .map((column, columnIndex) => {
        if (!isTextColumn(column))
          return null

        const { label, type, sortable } = column

        if (!isServerSort(sortable))
          return null

        const { ascKey, descKey } = sortable

        return {
          id,
          ascKey,
          descKey,
          columnIndex,
          type,
          label
        }
      })
      .filter(notNull)


  const toggleSortDirection = () => {
    if (sort.value.direction == 'asc')
      return sort.value.direction = 'desc'
    else return sort.value.direction = 'asc'
  }


  const selectSortField = (columnIndex: number) => {
    sort.value = {
      direction: sort.value.direction,
      columnIndex
    }
  }

  return {
    sort,
    serverSortOptions,
    selectedSortOption,
    setupSortOptions,
    selectSortField,
    toggleSortDirection
  }
}

const getDotNotation = (obj: object, key: string) => {
  const keyParts = key.split(/[\.\[\]]+/).filter(Boolean); // split on . and [], and filter out empty strings
  const getKey = (item: any, key: string) => {

    return item[key];
  }
  return keyParts.reduce(getKey, obj);
}



export const useTable = () => {
  const getValue = <T extends TableRow>(column: TableColumn<T>, row: T) => {
    if (column.type == 'buttons')
      return undefined

    if (column.getValue)
      return column.getValue(row)

    if (column.rowKey)
      return getDotNotation(row, column.rowKey)
  }

  const isTextColumn = <T extends TableRow>(col: TableColumn<T>): col is TableColumnText<T> => {
    return col.type != 'buttons'
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

      if (aField === 0 && bField === 0) {
        return 0
      } else if (aField === 0) {
        return 1
      } else if (bField === 0) {
        return -1
      }

      return direction === 'asc'
        ? (aField < bField ? -1 : aField > bField ? 1 : 0)
        : aField > bField ? -1 : aField < bField ? 1 : 0
    })
  }

  return {
    isTextColumn,
    sortRows,
    getValue
  }
}