import { IXToken, CollectionData, Collections } from "../../useCollection"

interface CollectionResponse {
  success: boolean
  status: number
  message: string
  data: CollectionData
}
interface CollectionsResponse {
  success: boolean
  status: number
  message: string
  data: Collections
}


export const useCollectionData = (slug: string, network = 'polygon') => {
  return useAsyncDataState('collection-' + slug, () =>
    fetchIXAPI('collections/' + slug + '/nfts', 'POST') as Promise<CollectionResponse>, {
    transform: (item) => {
      console.log('item', item)
      return item.data as CollectionData
    }
    // item.data.nfts.map((item) => (item as IXToken))
  })
}

export const useCollectionsData = (network = 'polygon') =>
  useAsyncDataState('collections', () =>
    fetchIXAPI('collections') as Promise<CollectionsResponse>, {
    transform: (item) =>
      item.data as Collections
  }
  )
