import { TokenIdentifier } from "~/../../layers/ix-base/composables/Token/useTokens"

export interface CollectionItem extends TokenIdentifier {
  asset?: string
}
export type SortField = string & keyof CollectionItem
export type CollectionDisplayType = 'list' | 'grid'
export type SortOrder = 'desc' | 'asc'

export interface CollectionSort {
  field?: SortField,
  direction: SortOrder
}

export const useCollectionSettings = () => {
  const sort = useState<CollectionSort>('table-sort', () => ({
    field: 'type',
    direction: 'asc'
  }))

  const toggleSortDirection = () => {
    if (sort.value.direction == 'asc')
      return sort.value.direction = 'desc'
    else return sort.value.direction = 'asc'
  }

  const selectSortField = (field: SortField) => {
    sort.value.direction = 'asc'
    sort.value.field = field
  }

  const displayType = useState<CollectionDisplayType>('collection-display-type', () => 'grid')

  const toggleDisplayType = () => {
    if (displayType.value == 'grid')
      return displayType.value = 'list'
    else
      return displayType.value = 'grid'
  }

  return {
    sort,
    displayType,
    toggleSortDirection,
    selectSortField,
    toggleDisplayType,
  }
}