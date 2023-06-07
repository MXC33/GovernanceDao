import { SingleItemData } from "@ix/base/composables/Token/useIXToken"

interface AssetId {
  contract: string,
  network: string,
  tokenId: string
}


export interface SingleItemResponse {
  success: boolean
  status: number
  message: string
  data: SingleItemData
}

export const useAssetAPI = (identifier: AssetId) => {
  const { fetchIXAPI } = useIXAPI()
  return useAsyncDataState(`nft-data-${Object.values(identifier).join('-')}`, () => {
    const { network, contract, tokenId } = identifier
    return fetchIXAPI('collections/' + network + '/' + contract + '/' + tokenId) as Promise<SingleItemResponse>
  }, {
    transform: (response) => response?.data
  })
}