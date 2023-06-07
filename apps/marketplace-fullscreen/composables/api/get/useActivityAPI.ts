import { IXToken, SingleItemData } from "@ix/base/composables/Token/useIXToken"

interface AssetId {
  contract: string,
  network: string,
  tokenId: string
}

export interface ActivityData {
  event: string
  hash: string
  nft: IXToken
  price: number
  quantity: number
  from: string
  to: string
  timestamp: number
}

export interface ActivityDataList {
  list: ActivityData[]
}


export interface ActivityResponse {
  success: boolean
  status: number
  message: string
  data: ActivityDataList
}

export const useActivityAPI = () => {
  const { fetchIXAPI } = useIXAPI()
  return useAsyncDataState(`activity-data`, () => {
    return fetchIXAPI('collections/account/activities/50') as Promise<ActivityResponse>
  }, {
    transform: (response) => response?.data
  })
}