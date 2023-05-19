import { TokenIdentifier } from "@ix/base/composables/Token/useTokens"
import {Attribute, Parent} from "~/composables/api/api";

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
  filters: any[]
}
export interface IXToken {
  _index: string
  collection: string
  network: string
  token_id: number
  type: number
  nft_type: number
  reference: any
  image: string
  thumbnail: string
  icon: string
  video: string
  name: string
  slug: any
  attributes: Attribute[]
  sale_price: number
  higher_bid_price: number
  parent: Parent
  my_shares: number
}
export interface CollectionItem extends TokenIdentifier {
  asset?: string,
  id: string
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