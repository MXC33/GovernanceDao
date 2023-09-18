import { NftFragment, StakedMcnftInfoFragment } from '#gql'
import { TokenWithInfoBlocks } from '../useInfoBlocks'
import { ContractTier } from '../useTileRings'
import { Corporation } from './useCorporations'

type StakingState = 'stake' | 'unstake'

export interface CorporationStakeItem extends TokenWithInfoBlocks, Omit<StakedMcnftInfoFragment, 'tokenId'> {
  state?: StakingState
  staked: boolean,
  description?: string
}


type TokenOwnershipState = 'owned' | 'pending' | 'staked' | 'not-owned'

export const useMaybeStakedTokenState = () => {
  const { balanceOfToken } = useUserData()

  const tokenOwnedState = (token: NftFragment): TokenOwnershipState => {
    const stakedEthBalance = useStakedEthData(token)
    const stakedBalance = useStakedCorporationGenesis(token.tokenInfo?.tier as Corporation).value
    const stakedMCBalance = useStakedTileContract(token.tokenInfo?.tier as ContractTier).value
    const balance = balanceOfToken(token)

    if (stakedEthBalance > 0 && stakedBalance == 0)
      return 'pending'

    if (stakedBalance > 0 || stakedMCBalance > 0)
      return 'staked'

    if (balance > 0)
      return 'owned'

    else return 'not-owned'
  }

  return { tokenOwnedState }
}

export const useStakedEthData = (token: NftFragment) => {
  const { data: stakedGenesisNFTEthData } = useStakeGenesisNFTEthData()

  return stakedGenesisNFTEthData.value?.find(item =>
    item.token.tokenInfo.type == token.tokenInfo.type
  )?.amount

}


export const useStakedCorporationGenesis = (corporation: Corporation) => {
  return useStakedDataBalance("genesis", corporation)
}

export const useStakedTileContract = (tier: ContractTier) => {
  return useStakedDataBalance("tile-contract", tier)
}


export const useStakedDataBalance = (type: string, tier: string) => {
  const { data: stakedMCNFTData } = useStakeMCNFTData()
  const { data: stakedGenesisNFTData } = useStakeGenesisNFTData()

  return computed(() => {
    const bothStakedData = (stakedMCNFTData.value ?? []).concat(stakedGenesisNFTData.value ?? [])

    return bothStakedData.find(item =>
      item.token.tokenInfo.tier == tier &&
      item.token.tokenInfo.type == type
    )?.amount ?? 0
  })
}


export const useStakeMCNFTData = () =>
  useAsyncState('stake-mc-nft-data', async () => {
    const credentials = useGraphqlCredentials()
    const stakedData = await GqlStakedMCNFT({ credentials })
    return stakedData.stakedMCNFTs
  })

export const useStakeGenesisNFTData = () =>
  useAsyncState('stake-genesis-nft-data', async () => {
    const credentials = useGraphqlCredentials()
    const stakedData = await GqlStakedGenesisNFT({ credentials })
    return stakedData.stakedGenesisNFTs
  })


export const useStakeGenesisNFTEthData = () =>
  useAsyncState('stake-genesis-eth-nft-data', async () => {
    const credentials = useGraphqlCredentials()
    const stakedData = await GqlStakedGenesisNFTEth({ credentials })
    return stakedData.stakedGenesisNFTsEth
  })



export const useCorporationStake = () => {
  const activeStakeItem = useState<CorporationStakeItem | null>('corporation-selected-stake', () => null)
  const proposedStakeItems = useState<CorporationStakeItem[]>('corporation-staked-proposed', () => [])

  const { isSameNFT } = useNFTs()

  const getProposedItem = (stakeItem: CorporationStakeItem) => {
    return proposedStakeItems.value.find((item) => isSameNFT(item.token, stakeItem.token))
  }

  const toggleStakeItem = (stakeItem: CorporationStakeItem) => {
    const activeIndex = proposedStakeItems.value.findIndex((item) => isSameNFT(item.token, stakeItem.token))
    if (activeIndex != -1)
      proposedStakeItems.value.splice(activeIndex, 1)
    else
      proposedStakeItems.value.push({
        ...stakeItem,
        state: stakeItem.staked ? 'unstake' : 'stake'
      })
  }

  const proposedItemsAction = computed(() => {
    const hasUnstakeItems = proposedStakeItems.value?.some(items => items.state == 'unstake')
    const hasStakeItems = proposedStakeItems.value?.some(items => items.state == 'stake')
    const hasStakeAndUnstakeItems = hasUnstakeItems && hasStakeItems

    if (hasStakeAndUnstakeItems)
      return 'stakeAndUnstake'
    if (hasUnstakeItems)
      return 'unstake'
    if (hasStakeItems)
      return 'stake'
  })

  const resetState = () => {
    activeStakeItem.value = null
    proposedStakeItems.value = []
  }

  const completion = useCorporationCompletion()

  return {
    ...completion,
    resetState,
    activeStakeItem,
    proposedStakeItems,
    proposedItemsAction,
    toggleStakeItem,
    getProposedItem
  }
}
