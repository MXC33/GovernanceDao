import { CredentialsInput, NftFragment } from '#gql';
import { ethers } from 'ethers';
import { kebabCaseIt } from 'case-it';
import { TokenType } from './Token/tokenMaps';
import { TokenIdentifier } from './Token/useTokens';

const TOKENS_KEY = 'user-nft-tokens'
const IXT_KEY = 'user-ixt-balance'

export type UserResource = 'astro-credit' | 'ixt' | 'drone' | 'waste' | 'power' | 'energy' | 'gas-price' | 'astro-gold' | 'astro-gold-lite' | 'mc-level'

const hasItem = (item: object | null) => !!item

type GqlCredentialsCtx = { credentials: CredentialsInput }

const useGqlWithCredentials = async <T>(fn: (ctx: GqlCredentialsCtx) => Promise<T>): Promise<T | null> => {
  const credentials = useGraphqlCredentials()
  if (!credentials)
    return null

  return fn({ credentials })
}

type NftQueryData<PropertyName extends string> = {
  [P in PropertyName]?: (NftFragment | null)[] | null | undefined
}

const filterAndCastItems = <P extends string, Q extends NftQueryData<P>>(data: Q | never[], path: P) =>
  ((data as Q)[path] ?? []).map(parseNftFragment).filter(hasItem) as TokenIdentifier[]

const useAsyncNFTFragments = <P extends string, Q extends NftQueryData<P>>(query: (ctx: GqlCredentialsCtx) => Promise<Q>, path: P, id: string) =>
  useAsyncDataState(id, async () => {
    const data = await useGqlWithCredentials(query)
    if (!data)
      return []
    return data
  }, { transform: (data) => filterAndCastItems(data, path) })

const useLandmarkData = () =>
  useAsyncNFTFragments(GqlLandmarks, 'landmarks', 'landmarks-data')

export const useTokenData = () =>
  useAsyncNFTFragments(GqlTokens, 'missionControlTokens', TOKENS_KEY)

export const useRoverData = () =>
  useAsyncNFTFragments(GqlRovers, 'rover', 'rover-data')

export const useEthNFTData = () =>
  useAsyncNFTFragments(GqlEthNFTs, 'ethNFTs', 'eth-nft-data')

export const useAvatarNFTData = () =>
  useAsyncNFTFragments(GqlAvatarNFT, 'avatarNFT', 'avatar-nft-data')

export const useBadgeNFTData = () =>
  useAsyncNFTFragments(GqlBadgeNFT, 'badgeNFT', 'badge-nft-data')


export const useCurrencyData = () => {
  const asyncState = useAsyncDataState(IXT_KEY, () =>
    useGqlWithCredentials(GqlCurrencies)
    , {
      transform: (data) => {
        if (!data?.currencies)
          return null

        const { currencies } = data

        const balanceOf = (type: TokenType) =>
          currencies.find((item) => item?.type && kebabCaseIt(item?.type.toLowerCase()) == type)?.balance ?? 0

        return {
          ixt: balanceOf('ixt'),
          astroGold: balanceOf('astro-gold'),
          astroGoldLite: balanceOf('astro-gold-lite')
        }
      }
    })

  const createCurrencyNft = (type: TokenType, balance?: number): TokenIdentifier => ({
    type,
    //@ts-ignore
    name: type,
    tokenId: type,
    balance: balance ?? 0
  })

  const ixtToken = computed<TokenIdentifier>(() =>
    createCurrencyNft('ixt', asyncState.data.value?.ixt)
  )

  const astroGoldToken = computed<TokenIdentifier>(() =>
    createCurrencyNft('astro-gold', asyncState.data.value?.astroGold)
  )

  const astroGoldLiteToken = computed<TokenIdentifier>(() =>
    createCurrencyNft('astro-gold-lite', asyncState.data.value?.astroGoldLite)
  )
  return {
    ...asyncState,
    ixtToken,
    astroGoldToken,
    astroGoldLiteToken
  }
}


export const useAsyncGasPrice = () =>
  useAsyncDataState('gas-price', async () => {

    const { provider } = useWallet()
    try {
      const gasPriceWei = await provider.value?.getGasPrice()
      if (!gasPriceWei)
        return null

      const gasPriceGwei = ethers.utils.formatUnits(gasPriceWei, 'gwei').substring(0, 7)
      let gasPriceIndicator;

      if (Number(gasPriceGwei) > 125)
        gasPriceIndicator = 'high'
      if (Number(gasPriceGwei) < 40)
        gasPriceIndicator = 'low'
      else gasPriceIndicator = 'stable'

      return {
        gasPriceIndicator,
        gasPriceWei,
        gasPriceGwei
      }
    } catch (error) {
      return null
    }
  })


export const usePlayerBaseLevelData = () =>
  useAsyncDataState('player-base-level-data', async () =>
    useGqlWithCredentials(GqlPlayerBaseLevel)
    , { transform: (data) => data?.playerBaseLevel ?? 0 })

export const useUserData = () => {
  const { execute: fetchPlayerBaseLevel, data: playerBaseLevel } = usePlayerBaseLevelData()

  // const { execute: initialFetchAllTiles } = useTileData()

  // const { data: landData, execute: fetchLandData, refresh: refreshLandData } = useLandData()

  const { data: landmarks, execute: fetchLandmarks, refresh: refreshLandmarks } = useLandmarkData()

  const { data: nfts, pending: fetchingTokens, execute: fetchTokens, refresh: refreshTokens } = useTokenData()

  const { data: ethNFTs, execute: fetchEthNFTs, refresh: refreshEthNFTs } = useEthNFTData()

  const { ixtToken, astroGoldLiteToken, astroGoldToken, data: currencyData, execute: fetchCurrencies, refresh: refreshCurrencies } = useCurrencyData()

  // const { data: packs, execute: fetchGravityGrade, refresh: refreshGravityGrade } = useGravityGradeData()

  // const { execute: fetchStakedMCNFT } = useStakeMCNFTData()

  // const { execute: fetchStakedGenesis } = useStakeGenesisNFTData()

  // const { execute: fetchStakedGenesisEth } = useStakeGenesisNFTEthData()

  const { execute: fetchRovers, pending: fetchingRovers, data: rovers, refresh: refreshRover } = useRoverData()

  const { execute: fetchAvatars, pending: fetchingAvatars, data: avatars, refresh: refreshAvatars } = useAvatarNFTData()

  const { execute: fetchAOCBadges, pending: fetchingBadges, data: aocbadges, refresh: refreshAOCBadges } = useBadgeNFTData()

  const allTokens = computed(() => {
    return [
      ...landmarks.value ?? [],
      ...nfts.value ?? [],
      ...rovers.value ?? [],
      ...avatars.value ?? []
    ]
  })


  const fetchCommonData = () =>
    Promise.all([fetchTokens(), fetchCurrencies(), fetchRovers()]) // fetchLandData()

  // const fetchGameAssets = () =>
  //   Promise.all([initialFetchAllTiles(), fetchCommonData(), fetchStakedMCNFT(), fetchPlayerBaseLevel(), fetchStakedGenesis(), fetchStakedGenesisEth()].flat())

  const fetchUserInventory = () =>
    Promise.all([fetchLandmarks(), fetchCommonData(), fetchEthNFTs(), fetchAvatars(), fetchAOCBadges()].flat()) // fetchGravityGrade()

  // const refreshUserInventory = () =>
  //   Promise.all([refreshLandmarks(), refreshGravityGrade(), refreshLandData(), refreshTokens(), refreshEthNFTs(), refreshRover(), refreshAvatars(), refreshAOCBadges()])

  // const refreshPacks = () =>
  //   Promise.all([refreshGravityGrade(), refreshTokens()])

  // const spoofWaste = ref([{ type: 'waste' as TokenType, balance: 100 }])

  const balanceOfToken = useTokenBalance([
    ethNFTs,
    nfts,
    rovers,
    avatars,
    aocbadges
  ])

  const ixtBalance = computed(() => ixtToken.value.balance ?? 0)
  const astroGoldBalance = computed(() => astroGoldToken.value.balance ?? 0)
  const astroGoldLiteBalance = computed(() => astroGoldLiteToken.value.balance ?? 0)
  const mcLevel = computed(() => playerBaseLevel.value ?? 0)



  const userResources = computed(() => {
    const astroCredits = balanceOfToken({ type: 'astro-credit' })
    const waste = balanceOfToken({ type: 'waste' })
    const energy = balanceOfToken({ type: 'energy' })

    return {
      astroCredits,
      waste,
      energy,
      mcLevel,
      ixtBalance: ixtBalance.value,
      astroGoldBalance: astroGoldBalance.value,
      astroGoldLiteBalance: astroGoldLiteBalance.value
    }
  })

  return {
    nfts,
    currencyData,
    landmarks,
    userResources,
    fetchingTokens,
    ethNFTs,
    ixtBalance,
    playerBaseLevel,
    rovers,
    avatars,
    aocbadges,
    allTokens,
    fetchUserInventory,
    balanceOfToken
  }
}