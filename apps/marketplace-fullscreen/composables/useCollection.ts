import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { NFTType } from "~/composables/useAssetContracts";

export interface FilterPayload {
  value: string
  trait_type: string
}
export interface CollectionPayload {
  page_key: number,
  order: number,
  filter: {
    owned: boolean,
    type: number,
    search: string,
    attributes: FilterPayload[]
  }
}
interface FilterBase {
  title: string
  trait_type: string
  type: FilterType
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

export type CollectionContext = 'my-assets' | 'outgoing-bids' | 'incoming-bids' | 'active-listings' | 'collection'

export interface Collection {
  name: string
  slug: string
  contract: string
  network: string
  currency: string
  nft_count: number
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
  nft_type: NFTType
  network: string
  collection: string
  parent: any
  shares: number
  nfts: IXToken[]
  page_key: string
  filters: APIFilter[]
}

export type CollectionDisplayType = 'list' | 'grid'

export const collectionName = (collectionAddress: string) => {

  switch (collectionAddress.toLowerCase()) {
    case assetsAddress.polygon?.toLowerCase():
      return 'Pix Assets'
    case landmarkAddress.polygon?.toLowerCase():
      return 'Landmarks'
    case gravityGradeAddress.polygon?.toLowerCase():
      return 'Gravity Grade'
    case avatarNFTAddress.polygon?.toLowerCase():
      return 'Avatars'
    case badgeNFTAddress.polygon?.toLowerCase():
      return 'AOC Badges'
    case roverAddress.polygon?.toLowerCase():
      return 'Rovers'

  }
}

export const useCollectionSettings = () => {
  const activeFilters = useState<Filter[]>('activeFilters', () => ([]))
  const collectionOwners = useState('collectionOwners', () => ("All"))

  const displayType = useState<CollectionDisplayType>('collection-display-type', () => 'grid')

  const toggleDisplayType = () => {
    if (displayType.value == 'grid')
      return displayType.value = 'list'
    else
      return displayType.value = 'grid'
  }

  const createFilters = (data: CollectionData) => {
    activeFilters.value = data.filters.map((filter) => ({
      ...filter,
      value: filter.value.map((name) => ({
        name,
        selected: false
      }))
    }))
  }

  const filtersAsPayload = computed(() =>
    activeFilters.value
      .map(({ trait_type, value }) => ({
        trait_type,
        value: value.find((item) => item.selected)?.name
      }))
      .filter((filter): filter is FilterPayload => !!filter.value)
  )


  return {
    displayType,
    filtersAsPayload,
    createFilters,
    toggleDisplayType,
    activeFilters,
    collectionOwners,
  }
}
