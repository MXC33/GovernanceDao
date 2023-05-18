import { TokenIdentifier } from "@ix/base/composables/Token/useTokens"
import { TokenId } from "@ix/base/composables/Token/tokenMaps"

export const BASE_API_ENDPOINT_URL = 'https://api.planetix.com/api/v1'

export interface CollectionItemData {
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

export interface Attribute {
  value: string
  trait_type: string
}

export interface Parent {
  id: string
  name: string
  slug: string
  parent_id: any
}

export interface CollectionItemAndToken {
  data: CollectionItemData,
  token: TokenIdentifier
}

export const useIXHeaders = () => {
  const { walletSigningToken } = useWallet()
  const authUserData = useAuthUserData()

  return computed(() => ({
    'Content-Type': 'application/json',
    'authorization': `Bearer ${authUserData.value?.access_token}`,
    'web3-authorization': `Web3 ${walletSigningToken.value}`
  }))
}

export const fetchIXAPI = (path: string, method: 'GET' | 'POST' = 'GET', body?: object) => {
  const headers = useIXHeaders()

  return $fetch(BASE_API_ENDPOINT_URL + '/' + path, {
    method: method,
    body: body,
    headers: {
      ...headers.value
    }
  })
}

export const parseCollectionToken = (nft: CollectionItemData): TokenIdentifier | null => {
  if (!nft)
    return null

  const tokenId: TokenId = Number(nft.token_id) as TokenId

  const type = getTokenType(tokenId)
  const tier = getTokenTier(tokenId)

  if (!type)
    return null

  return {
    tokenId,
    type,
    tier: tier ?? undefined
  }
}
