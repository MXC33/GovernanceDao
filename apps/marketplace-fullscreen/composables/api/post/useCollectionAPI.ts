import { CollectionItemAndToken, CollectionItemData } from "../api"

interface CollectionResponse {
  success: boolean
  status: number
  message: string
  data: CollectionData
}

interface CollectionData {
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
  nfts: CollectionItemData[]
  page_key: string
  filters: any[]
}

export const useCollectionData = (slug: string, network = 'polygon') => {
  return useAsyncDataState('collection-' + slug, () =>
    fetchIXAPI('collections/' + slug + '/nfts', 'POST') as Promise<CollectionResponse>, {
    transform: (item) =>
      item.data.nfts.map((item) => ({
        data: item,
        token: parseCollectionToken(item)
      } as CollectionItemAndToken))

  })
}

export const useCollectionsData = (network = 'polygon') =>
  useAsyncDataState('collections', () =>
    fetchIXAPI('collections')
  )
