import { MaybeRef } from 'vue'
import { get } from '@vueuse/core'
import { TokenIdentifier } from './Token/useTokens'

type SortOrder = 'desc' | 'asc'

export type TableRow = TokenIdentifier
export type ColumnKey = string & keyof TableRow

export interface TableColumn {
  value: ColumnKey,
  label: string,
  sortable?: boolean,
  width?: number
}

export interface CollectionSort {
  field?: ColumnKey,
  direction: SortOrder
}

export const useCollectionSettings = () => {
  const sortSettings = useState<CollectionSort>('table-sort', () => ({
    field: 'type',
    direction: 'asc'
  }))

  const toggleDirection = () => {
    if (sortSettings.value.direction == 'asc')
      return sortSettings.value.direction = 'desc'
    else return sortSettings.value.direction = 'asc'
  }

  const selectField = (field: ColumnKey) => {
    sortSettings.value.direction = 'asc'
    sortSettings.value.field = field
  }

  return {
    toggleDirection,
    selectField,
    sortSettings
  }
}

export const useTableData = (rows: MaybeRef<TableRow[]>) => {
  const { sortSettings } = useCollectionSettings()

  const sortedRows = computed(() => {
    const data = get(rows)
    const { field, direction } = sortSettings.value

    const dataField: keyof TableRow = field ?? 'type'
    const getField = (row: TableRow) => row[dataField] ?? ""

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
    sortedRows
  }
}