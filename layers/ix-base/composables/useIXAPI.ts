import { PixInfoFragment } from '#gql'
import { callWithNuxt } from 'nuxt/app'
// import type { RaffleUpcomingResponse, RafflePastResponse, ActiveRaffleResponse } from './IX-API/types'

export const BASE_API_ENDPOINT_URL = 'https://api.planetix.com/api/v1'

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

  const baseURL = "https://api.planetix.com/api/v1"
  const loginURL = `${baseURL}/auth/login-mpfs`
  const usernameFromWalletAddressURL = `${baseURL}/mission-controll/username/wallet`

  const onUnauthorized = async () => {
    await callWithNuxt(app, () => {
      logoutWallet()
      return navigateTo('/connect')
    })
  }

  const fetchIXAPI = async (path: string, method: 'GET' | 'POST' = 'GET', body?: object) => {
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

      console.log("Has error", err)
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
    // fetchActiveRaffle,
    // fetchUpcomingRaffles,
    // fetchPastRaffles,
    // merkleData,
    // fetchHashForCollectFromTile
  }
}

