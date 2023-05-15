import { MaybeRef } from 'vue'
import { get } from '@vueuse/core'
import { CollectionItem, SortField } from './useCollection'

export interface TableColumn {
  value: SortField,
  label: string,
  sortable?: boolean,
  width?: number
}

export const useTableData = (rows: MaybeRef<CollectionItem[]>) => {
  const { sort } = useCollectionSettings()

  const sortedRows = computed(() => {
    const data = get(rows)
    const { field, direction } = sort.value

    const dataField: keyof CollectionItem = field ?? 'type'
    const getField = (row: CollectionItem) => row[dataField] ?? ""

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