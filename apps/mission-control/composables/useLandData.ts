import { NftFragment } from "#gql"
import { LandTypeMap, type LandType, type PixNFT, type PixTier } from "./NFTs/useLand"

export const useSearchPix = () => {
  const landSearchResults = useState<NftFragment[] | null>('land-search-result', () => null)
  const isSearchPending = useState('land-searching', () => false)

  const fetchUniquePixById = async (pixId: string) => {
    const credentials = useGraphqlCredentials()
    const chain = useActiveChain()
    return await GqlUniquePixWithInfoFromId({ credentials, pixId, chain })
  }

  const search = async (id: string) => {
    landSearchResults.value = null
    isSearchPending.value = true

    const data = await fetchUniquePixById(id)
    landSearchResults.value = data.searchPixId

    isSearchPending.value = false
    return true
  }

  return { landSearchResults, isSearchPending, search }
}

export const useLandData = () =>
  useAsyncDataState('land-data', async () => {
    const chain = useActiveChain()
    const credentials = useGraphqlCredentials()
    const { landAmount } = await GqlLand({ credentials, chain })
    return landAmount
  })



export const useFetchUniqueLand = () =>
  async (tier: PixTier, type: LandType) => {
    const credentials = useGraphqlCredentials()
    const chain = useActiveChain()
    const pageKey = { elastic: null, chain: null }

    const uniqueLand = await GqlUniqueLandWithInfo({ credentials, tier, type, pageKey, chain })
    return uniqueLand.uniqueLand
  }