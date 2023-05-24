import { CollectionData, Collection } from "../../useCollection"

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
  data: Collection[]
}


export const useCollectionData = (slug: string, body: any, network = 'polygon') => {
  return useAsyncDataState('collection-' + slug + body.page_key, () =>
    fetchIXAPI('collections/'+ network + '/' + slug , 'POST', body) as Promise<CollectionResponse>, {
    transform: (item) => {
      return item.data as CollectionData
    }
  })
}

export const useCollectionsData = (network = 'polygon') =>
  useAsyncDataState('collections', () =>
    fetchIXAPI('collections') as Promise<CollectionsResponse>, {
    transform: (item) =>
      item.data as Collection[]
  }
  )
