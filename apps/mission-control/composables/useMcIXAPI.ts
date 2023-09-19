
import { NftFragment } from '#gql'
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

export const useMcIXAPI = () => {
  const raffleURL = `mission-controll/raffles/`
  const usernameFromWalletAddressURL = `mission-controll/username/wallet`

  const { fetchIXAPI } = useIXAPI()

  const ixBlogs = () =>
    useAsyncDataState('ix-blogs', () => fetchIXAPI('blog/0/1?order=DESC'), {
      transform: (response: any) => {
        console.log("RESPONSE", response)
        return response.data.blogs.map((blog) => ({
          title: blog.title,
          slug: blog.slug,
          created: blog.created_at
        })) as IXBlog[]
      }
    })

  // Fetch Active Raffles: Dev API
  const fetchActiveRaffle = async () =>
    await fetchIXAPI(`${raffleURL}active/1`) as ActiveRaffleResponse

  // Fetch Past Raffles: Live API
  const fetchPastRaffles = async (page: number) =>
    await fetchIXAPI(`${raffleURL}/past/${page}`) as RafflePastResponse
  // Fetch Upcoming Raffles: Dev API

  const fetchUpcomingRaffles = async (page: number) =>
    await fetchIXAPI(`${raffleURL}/upcoming/${page}`) as RaffleUpcomingResponse

  const fetchUsernameFromWalletAddress = async (walletAddresses: string[]) =>
    await fetchIXAPI(usernameFromWalletAddressURL, 'POST', walletAddresses)

  const fetchMerkleData = async (pix: NftFragment) => {
    const { pix_id, category_id, merkle_index } = pix.mintInfo
    const fetchData = await fetchIXAPI("web3/get-proofs", "POST", [{
      pix_id,
      category_id,
      merkle_index,
    }]) as MerkleResponse
    return fetchData
  }

  const fetchHashForCollectFromTile = async (address: string, nonce: number, version?: string) => {
    const environment = useActiveChain() == 'polygon' ? 'prod' : 'dev'
    console.log(address, nonce)

    const body = {
      address,
      nonce
    }

    if (version)
      body['version'] = version

    return await fetchIXAPI('web3/collect-from-tiles/signature', 'POST', body, environment)
  }

  return {
    ixBlogs,
    fetchActiveRaffle,
    fetchPastRaffles,
    fetchUpcomingRaffles,
    fetchUsernameFromWalletAddress,
    fetchHashForCollectFromTile,
    fetchMerkleData
  }
}