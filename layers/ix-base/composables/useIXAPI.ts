import { PixInfoFragment } from '#gql'
import type { RaffleUpcomingResponse, RafflePastResponse, ActiveRaffleResponse } from './IX-API/types'

interface MerkleResponse {
  data: {
    infos: (string | number)[][]
    merkleProofs: string[][]
    merkleRoots: string[]
  },
  message: string,
  status: number,
}


export interface IXBlog {
  title: string,
  created: string,
  slug: string
}
export const useIXAPI = () => {
  const authUserData = useAuthUserData()
  const { walletSigningToken, logoutAndReload } = useWallet()

  const baseURL = "https://api.planetix.com/api/v1"
  const loginURL = `${baseURL}/auth/login-mpfs`
  const blogURL = `${baseURL}/blog/0/1?order=DESC`
  const raffleURL = `/mission-controll/raffles/`
  const usernameFromWalletAddressURL = `${baseURL}/mission-controll/username/wallet`

  const activeRaffleURL = `${baseURL}${raffleURL}active/1`
  const pastRaffleURL = `${baseURL}${raffleURL}active/`

  const ixBlogs = () =>
    useAsyncState('ix-blogs', () => $fetch(blogURL), {
      transform: (response: any) =>
        response.data.blogs.map((blog) => ({
          title: blog.title,
          slug: blog.slug,
          created: blog.created_at
        })) as IXBlog[]
    })

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


  // Fetch Active Raffles: Dev API
  const fetchActiveRaffle = async () =>
    await $fetch(activeRaffleURL) as ActiveRaffleResponse

  // Fetch Past Raffles: Live API
  const fetchPastRaffles = async (page: number) =>
    await $fetch(`https://api.planetix.com/api/v1/mission-controll/raffles/past/${page}`) as RafflePastResponse

  // Fetch Upcoming Raffles: Dev API
  const fetchUpcomingRaffles = async (page: number) =>
    await $fetch(`https://api.planetix.com/api/v1/mission-controll/raffles/upcoming/${page}`) as RaffleUpcomingResponse

  const fetchUsernameFromWalletAddress = async (walletAddresses: string[]) =>
    $fetch(usernameFromWalletAddressURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(walletAddresses)
    })

  const merkleData = async (pix: PixInfoFragment): Promise<MerkleResponse> => {
    const { pix_id, category_id, merkle_index } = pix.mintInfo

    return await $fetch("https://api.planetix.com/api/v1/web3/get-proofs", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${authUserData.value.access_token}`,
        'web3-authorization': `Web3 ${walletSigningToken.value}`
      },
      body: [{
        pix_id,
        category_id,
        merkle_index,
      }]
    })
  }


  const fetchHashForCollectFromTile = async (address: string, nonce: number, version?: string) => {
    const ENDPOINT_DEV = "https://dev-api.planetix.app/api/v1/web3/collect-from-tiles/signature"
    const ENDPOINT_MAIN = "https://api.planetix.com/api/v1/web3/collect-from-tiles/signature"
    const endpoint = useActiveChain() == 'polygon' ? ENDPOINT_MAIN : ENDPOINT_DEV

    console.log(address, nonce)
    const body = {
      address,
      nonce
    }

    if (version)
      body['version'] = version

    const response = await $fetch(endpoint, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${authUserData.value.access_token}`,
        'web3-authorization': `Web3 ${walletSigningToken.value}`
      },
    }).catch(error => {
      if (error.data.status == 403) {
        console.log("403 error, log out and reload of page needed.")
        logoutAndReload()
        return
      }
    })
    return response
  }



  return {
    loginIX,
    ixBlogs,
    fetchActiveRaffle,
    fetchUpcomingRaffles,
    fetchPastRaffles,
    fetchUsernameFromWalletAddress,
    merkleData,
    fetchHashForCollectFromTile
  }
}

