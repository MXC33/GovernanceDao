import { SingleItemData } from "@ix/base/composables/Token/useIXToken"

interface AssetId {
  slug: string,
  adress: string,
  network: string,
  tokenId: string
}


export interface SingleItemResponse {
  success: boolean
  status: number
  message: string
  data: SingleItemData
}

export const useAssetAPI = (identifier: AssetId) =>
  useAsyncDataState(`nft-data-${Object.values(identifier).join('-')}`, () => {
    const { slug, network, adress, tokenId } = identifier
    return fetchIXAPI('collections/' + slug + '/nfts/' + network + '/' + adress + '/' + tokenId) as Promise<SingleItemResponse>
  }, {
    transform: (response) => response?.data
  })