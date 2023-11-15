import { SingleItemData, PriceHistory } from "@ix/base/composables/Token/useIXToken"

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

export interface PriceHistoryResponse {
  success: boolean
  status: number
  message: string
  data: PriceHistory[]
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

export const usePriceHistoryAPI = (identifier: AssetId) => {
  const { fetchIXAPI } = useIXAPI()
  return useAsyncDataState(`nft-price-history-${Object.values(identifier).join('-')}`, () => {
    const { contract, tokenId } = identifier
    return fetchIXAPI('web3/nft/price/history/' + contract + '/' + tokenId) as Promise<PriceHistoryResponse>
  }, {

    transform: (response) => [{
      name: 'IXT',
      data: response?.data.slice(0, 500).map(item => ([item.timestamp * 1000, +item.price.toFixed(3)]))
    }]
  })
}
