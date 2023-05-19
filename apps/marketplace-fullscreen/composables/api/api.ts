import { TokenIdentifier } from "@ix/base/composables/Token/useTokens"
import { TokenId } from "@ix/base/composables/Token/tokenMaps"
import { IXToken } from "~/composables/useCollection"

export const BASE_API_ENDPOINT_URL = 'https://api.planetix.com/api/v1'


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
