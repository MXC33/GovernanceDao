import { IXToken, SingleItemData } from "@ix/base/composables/Token/useIXToken"

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
  page_key: string
}


export interface ActivityResponse {
  success: boolean
  status: number
  message: string
  data: ActivityDataList
}

export const useActivityAPI = () => {
  const { fetchIXAPI } = useIXAPI()

  const activePage = ref(0)


  const asyncData = useAsyncDataState(`activity-data`, () => {
    return fetchIXAPI('collections/account/activities/' + activePage.value) as Promise<ActivityResponse>
  }, {
    transform: (response) => response?.data,
    mergePages: (oldData, newData) => {
      return {
        ...newData,
        list: oldData.list.concat(newData.list)
      }
    }
  })

  const loadNextPage = () => {
    activePage.value = Number(asyncData.data.value?.page_key)
    return asyncData.fetchAndMerge()
  }


  return {
    ...asyncData,
    loadNextPage
  }
}