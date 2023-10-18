import { callWithNuxt } from 'nuxt/app'
import { IXAppConfig } from './useAppSetup'
// import type { RaffleUpcomingResponse, RafflePastResponse, ActiveRaffleResponse } from './IX-API/types'


// import type { RaffleUpcomingResponse, RafflePastResponse, ActiveRaffleResponse } from './IX-API/types' import { PixInfoFragment } from '#gql'
const API_PROD_URI = 'https://api.planetix.com/api/v1'
const API_DEV_URI = 'https://api.planetix.app/api/v1'

// import type { RaffleUpcomingResponse, RafflePastResponse, ActiveRaffleResponse } from './IX-API/types'

export const BASE_API_ENDPOINT_URL = () => {
  const { API_BASE_URL } = useRuntimeConfig().public
  return API_BASE_URL
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


const deleteCookie = (name: string) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const useIXAPI = () => {
  const headers = useIXHeaders()
  const app = useNuxtApp()
  const config = useAppConfig() as IXAppConfig
  const loginURL = `${BASE_API_ENDPOINT_URL()}/auth/login`
  const usernameFromWalletAddressURL = `${BASE_API_ENDPOINT_URL()}/mission-controll/username/wallet`

  const handleAPIError = (error: any) => {
    if (error.response && error.response._data && error.response._data.message)
      throw new Error(error.response._data.message)

    throw new Error(CustomErrors.unknownError)
  }

  const onUnauthorized = async () => {
    const route = useRoute()
    if (config.connectWithoutIXUser)
      return

    if (route.path.includes('connect') || route.path.includes('logout'))
      return

    await callWithNuxt(app, () => {
      return navigateTo({
        path: '/logout',
        query: {
          origin: encodeURIComponent(route.path)
        }
      })
    })
  }

  const fetchIXAPI = async (path: string, method: 'GET' | 'POST' | "PUT" = 'GET', body?: object, environment?: 'prod' | 'dev') => {
    let URI = BASE_API_ENDPOINT_URL()
    if (environment != undefined) {
      URI = environment == 'prod' ? API_PROD_URI : API_DEV_URI
    }

    try {
      const data = await $fetch(URI + '/' + path, {
        method: method,
        body: body,
        headers: {
          ...headers.value
        }
      })
      return data
    } catch (err) {
      if (err.message.includes("403") || err.message.includes("401"))
        await onUnauthorized()
      return null
    }
  }

  const loginIX = async (web3Token: string) => await
    $fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: '',
        password: '',
        google_auth_code: '',
        login_as_token: '',
        web3_token: web3Token
      })
    })


  const fetchUsernameFromWalletAddress = async (walletAddresses: string[]) =>
    $fetch(usernameFromWalletAddressURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(walletAddresses)
    })

  return {
    fetchIXAPI,
    loginIX,
    fetchUsernameFromWalletAddress,
    handleAPIError
    // fetchActiveRaffle,
    // fetchUpcomingRaffles,
    // fetchPastRaffles,
    // merkleData,
    // fetchHashForCollectFromTile
  }
}

