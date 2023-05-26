import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { TableSort, TableSortField } from "./useTable"

interface FilterPayload {
  value: string
  trait_type: string
}
export interface CollectionPayload {
  page_key: number,
  order: number,
  filter: {
    owned: boolean,
    type:number,
    search: string,
    attributes: FilterPayload[]
  }
}
interface FilterBase {
  title: string
  trait_type: string
  type: FilterType
  selected: boolean
}

export interface APIFilter extends FilterBase {
  value: string[]
}

export interface FilterValue {
  name: string,
  selected: boolean
}

export interface Filter extends FilterBase {
  value: FilterValue[]
}

export type FilterType = 'radio' | 'checkbox'

export interface Collection {
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
  owners?: number,
  token_id?: number,
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
  filters: APIFilter[]
}

export type CollectionDisplayType = 'list' | 'grid'

export const useCollectionSettings = () => {
  const activeFilters = useState<Filter[]>('activeFilters', () => ([]))
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