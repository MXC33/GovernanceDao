import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { TableSort, TableSortField } from "./useTable"

export interface Filter {
  title: string
  trait_type: string
  value: string[]
  type: FilterType
  selected: boolean
}

export interface Collections {
  name: string
  slug: string
  contract: string
  network: string
  currency: string
  order: string
  volume: string
}

export interface CollectionData {
  name: string
  currency: string
  total_volume: number
  floor_price?: number
  owners?: number
  sale_price: any
  higher_bid_price: any
  listed: number
  unique_owners: number
  creators_fee: number
  nfts_from: number
  nft_type: any
  network: string
  collection: string
  parent: any
  nfts: IXToken[]
  page_key: string
  filters: Filter[]
}

export type CollectionDisplayType = 'list' | 'grid'

export const useCollectionSettings = () => {
  const activeFilters = useState('activeFilters', () => ({}))
  const collectionOwners = useState('collectionOwners', () => ("All"))

  // const sort = useState<TableSort<IXToken>>('colleciton-table-sort', () => ({
  //   field: 'type',
  //   direction: 'asc'
  // }))

  const displayType = useState<CollectionDisplayType>('collection-display-type', () => 'grid')

  const toggleDisplayType = () => {
    if (displayType.value == 'grid')
      return displayType.value = 'list'
    else
      return displayType.value = 'grid'
  }

  return {
    displayType,
    toggleDisplayType,
    activeFilters,
    collectionOwners,
  }
}