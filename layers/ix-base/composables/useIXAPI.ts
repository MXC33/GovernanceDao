import { callWithNuxt } from 'nuxt/app'
// import type { RaffleUpcomingResponse, RafflePastResponse, ActiveRaffleResponse } from './IX-API/types' import { PixInfoFragment } from '#gql'
export const BASE_API_ENDPOINT_URL = 'https://api.planetix.com/api/v1'
export const BASE_API_DEV_ENDPOINT_URL = 'https://api.planetix.app/api/v1'

export const useIXHeaders = () => {
  const { walletSigningToken } = useWallet()
  const authUserData = useAuthUserData()

  return computed(() => ({
    'Content-Type': 'application/json',
    'authorization': `Bearer ${authUserData.value?.access_token}`,
    'web3-authorization': `Web3 ${walletSigningToken.value}`
  }))
}



export const useIXAPI = () => {
  const { logoutWallet } = useWallet()
  const headers = useIXHeaders()
  const app = useNuxtApp()
  const route = useRoute()
  const baseURL = "https://api.planetix.com/api/v1"
  const loginURL = `${baseURL}/auth/login`
  const usernameFromWalletAddressURL = `${baseURL}/mission-controll/username/wallet`

  const handleAPIError = (error: any) => {
    if (error.response && error.response._data && error.response._data.message)
      throw new Error(error.response._data.message)

    throw new Error(CustomErrors.unknownError)
  }

  const onUnauthorized = async () => {
    if (route.path.includes('connect'))
      return

    await callWithNuxt(app, () => {
      logoutWallet()

      console.log("UNAUTHORIZED")

      return navigateTo({
        path: '/connect',
        query: {
          redirectUrl: encodeURIComponent(route.path)
        }
      })
    })
  }

  const fetchIXAPI = async (path: string, method: 'GET' | 'POST' | "PUT" = 'GET', body?: object) => {
    try {
      const data = await $fetch(BASE_API_ENDPOINT_URL + '/' + path, {
        method: method,
        body: body,
        headers: {
          ...headers.value
        }
      })
      return data
    } catch (err) {
      if (err.message.includes("403"))
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

