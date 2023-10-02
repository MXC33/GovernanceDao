import { ethers } from 'ethers';
import { NftFragment } from '#gql';

export type UserResource = 'astro-credit' | 'ixt' | 'drone' | 'waste' | 'power' | 'energy' | 'gas-price' | 'astro-gold' | 'astro-gold-lite' | 'mc-level'

const useLandmarkData = () =>
  useAsyncDataState('landmarks-data', async () => {
    const credentials = useGraphqlCredentials()
    const landmark = await GqlLandmarks({ credentials })
    return landmark.landmarks
  })


export const useRoverData = () =>
  useAsyncDataState('rover-data', async () => {
    const credentials = useGraphqlCredentials()
    const rovers = await GqlRovers({ credentials })
    return rovers.rover
  })

// export const useCurrencyData = () =>
//   useAsyncDataState(IXT_KEY, async () => {
//     const credentials = useGraphqlCredentials()
//     const currencies = await GqlCurrencies({ credentials })
//     console.log("currencies", currencies.currencies)

//     const ixtBalance = computed(() => currencies.currencies?.find(item => item.tokenInfo.type == 'ixt')).value
//     const astroGoldBalance = computed(() => currencies.currencies?.find(item => item.tokenInfo.type == 'astro-gold')).value
//     const astroGoldLiteBalance = computed(() => currencies.currencies?.find(item => item.tokenInfo.type == 'astro-gold-lite')).value

//     return {
//       ixtBalance,
//       astroGoldBalance,
//       astroGoldLiteBalance
//     }
//   })



export const useAsyncGasPrice = () => {
  const { provider } = useWallet()

  return useAsyncDataState('gas-price', async () => {
    try {
      const gasPriceWei = await provider.value?.getGasPrice()
      const gasPriceGwei = ethers.utils.formatUnits(gasPriceWei, 'gwei').substring(0, 7)

      const gasPriceIndicator = (() => {
        if (Number(gasPriceGwei) > 125)
          return 'high'
        if (Number(gasPriceGwei) < 40)
          return 'low'
        return 'stable'
      })()

      return {
        gasPriceIndicator,
        gasPriceWei,
        gasPriceGwei
      }
    } catch (error) {
      return null
    }
  })
}

export const useAvatarNFTData = () =>
  useAsyncDataState('avatar-nft-data', async () => {
    const credentials = useGraphqlCredentials()
    const avatars = await GqlAvatarNFT({ credentials })
    return avatars.avatarNFT
  })

export const useEthNFTData = () =>
  useAsyncDataState('eth-nft-data', async () => {
    const credentials = useGraphqlCredentials()
    const ethNFTs = await GqlEthNFTs({ credentials })
    return ethNFTs.ethNFTs
  })


const useBadgeNFTData = () =>
  useAsyncDataState('badge-nft-data', async () => {
    const credentials = useGraphqlCredentials()
    const badge = await GqlBadgeNFT({ credentials })
    return badge.badgeNFT
  })

const useGeoLotteryNFTData = () =>
  useAsyncDataState('geolottery-nft-data', async () => {
    const credentials = useGraphqlCredentials()
    const geoLottery = await GqlGeoLotteryNFT({ credentials })
    return geoLottery.geoLotteryNFT
  })

export const useGravityGradeData = () =>
  useAsyncDataState('gravity-grade', async () => {
    const credentials = useGraphqlCredentials()
    if (!credentials)
      return

    const gravityGradeNFTBalance = await GqlGravityGradeNFTBalance({ credentials })
    return gravityGradeNFTBalance.gravityGradeNFTBalance
  })




export const usePlayerBaseLevelData = () => {
  return useAsyncDataState('player-base-level-data', async () => {
    const credentials = useGraphqlCredentials()
    const data = await GqlPlayerBaseLevel({ credentials })
    console.log("Fetching base level", data.playerBaseLevel)
    return data
  }, { transform: (data) => data.playerBaseLevel ?? 0 })
}

export const useUserData = () => {

  const { execute: fetchPlayerBaseLevel, data: playerBaseLevel } = usePlayerBaseLevelData()

  const { execute: initialFetchAllTiles } = useTileData()

  const { data: landData, execute: fetchLandData, refresh: refreshLandData } = useLandData()

  const { data: landmarks, execute: fetchLandmarks, refresh: refreshLandmarks } = useLandmarkData()

  const { data: nfts, pending: fetchingTokens, execute: fetchTokens, refresh: refreshTokens } = useTokenData()

  const { data: ethNFTs, execute: fetchEthNFTs, refresh: refreshEthNFTs } = useEthNFTData()

  const { data: currencyData, execute: fetchCurrencies, refresh: refreshCurrencies } = useCurrencyData()

  const { data: packs, execute: fetchGravityGrade, refresh: refreshGravityGrade } = useGravityGradeData()

  const { execute: fetchStakedMCNFT } = useStakeMCNFTData()

  const { execute: fetchStakedGenesis } = useStakeGenesisNFTData()

  const { execute: fetchStakedGenesisEth } = useStakeGenesisNFTEthData()

  const { execute: fetchRovers, data: rovers, refresh: refreshRover } = useRoverData()

  const { execute: fetchAvatars, data: avatars, refresh: refreshAvatars } = useAvatarNFTData()

  const { execute: fetchAOCBadges, data: aocbadges, refresh: refreshAOCBadges } = useBadgeNFTData()

  const { execute: fetchGeoLottery, data: geoLottery, refresh: refreshGeoLottery } = useGeoLotteryNFTData()


  const fetchCommonData = () =>
    Promise.all([fetchTokens(), fetchLandData(), fetchRovers(), fetchCurrencies()])

  const fetchGameAssets = () =>
    Promise.all([initialFetchAllTiles(), fetchCommonData(), fetchStakedMCNFT(), fetchPlayerBaseLevel(), fetchStakedGenesis(), fetchStakedGenesisEth()].flat())

  const fetchUserInventory = () =>
    Promise.all([fetchLandmarks(), fetchGravityGrade(), fetchCommonData(), fetchEthNFTs(), fetchAvatars(), fetchAOCBadges(), fetchGeoLottery()].flat())

  const refreshUserInventory = () =>
    Promise.all([refreshLandmarks(), refreshGravityGrade(), refreshLandData(), refreshTokens(), refreshEthNFTs(), refreshRover(), refreshAvatars(), refreshAOCBadges(), refreshGeoLottery()])

  const refreshPacks = () =>
    Promise.all([refreshGravityGrade(), refreshTokens()])

  const balanceOfToken = (token: NftFragment, decimalCount?: number) => {
    return useTokenBalance([
      ethNFTs.value as NftFragment,
      nfts.value as NftFragment,
      packs.value as NftFragment,
      currencyData.value as NftFragment,
      landData.value as NftFragment,
      rovers.value as NftFragment,
      avatars.value as NftFragment,
      aocbadges.value as NftFragment,
      geoLottery.value as NftFragment
    ])(token, decimalCount)
  }


  const mcLevel = computed(() => playerBaseLevel.value ?? 0)


  const userResources = computed(() => {
    const waste = balanceOfToken(nfts.value.find(item =>
      item.tokenInfo.type == 'waste')
    )

    const astroCredits = balanceOfToken(nfts.value.find(item =>
      item.tokenInfo.type == 'astro-credit')
    )

    const energy = balanceOfToken(nfts.value.find(item =>
      item.tokenInfo.type == 'energy')
    )

    return {
      astroCredits,
      waste,
      energy,
      mcLevel,
    }
  })

  return {
    nfts,
    currencyData,
    landmarks,
    userResources,
    fetchingTokens,
    packs,
    ethNFTs,
    playerBaseLevel,
    rovers,
    avatars,
    aocbadges,
    geoLottery,
    balanceOfToken,
    fetchUserInventory,
    fetchGameAssets,
    refreshPacks,
    refreshUserInventory
  }
}