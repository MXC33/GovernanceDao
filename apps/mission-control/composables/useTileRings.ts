import { NftFragment } from "#gql"
import { Tile, TileRing } from "./useTiles"

const RingCount: Partial<Record<TileRing, number>> = {
  A: 1,
  B: 2,
  C1: 3,
  C2: 3
}


export const DistrictRingNameMap = {
  apollo: 'A',
  artemis: 'B',
  chronos: 'C',
  helios: 'C'
} as const

export type ContractTier = keyof typeof DistrictRingNameMap

export const useTileRings = () => {
  const { balanceOfToken } = useUserData()
  const { data: stakedContracts } = useStakeMCNFTData()

  const getTierForRing = (ring: TileRing): ContractTier => {
    switch (ring) {
      case 'A':
        return 'apollo'

      case 'B':
        return 'artemis'

      case 'C1':
        return 'chronos'

      case 'C2':
        return 'helios'
    }
  }

  const getRingForToken = (tier: ContractTier) => {
    switch (tier) {
      case 'apollo':
        return 'A'

      case 'artemis':
        return 'B'

      case 'chronos':
        return 'C1'

      case 'helios':
        return 'C2'
    }

  }

  const tokenInfoForRing = (ring: TileRing) => {
    const tier = getTierForRing(ring)
    const balanceOfStakedToken = useStakedTileContract(tier)
    const token = { tokenInfo: { type: 'tile-contract', tier } }

    return {
      owned: balanceOfToken(token) > 0,
      staked: balanceOfStakedToken.value > 0
    }
  }

  const amountOfStakeRings = computed(() => {

    const ring = (stakedContracts.value ?? []).filter((token) =>
      token.amount > 0
    ).map((token) =>
      getRingForToken(token.token.tokenInfo.tier as ContractTier)
    ).reverse()[0]

    if (ring)
      return RingCount[ring]
    else
      return 2
  })

  const tileCountInRing = (ring: TileRing) =>
    TileRings[ring].length

  const getRingName = (ring: TileRing) => {
    // const total = tileCountInRing(ring)
    return `District ${ring}`
  }

  return {
    getRingName,
    tileCountInRing,
    getRingForToken,
    tokenInfoForRing,
    amountOfStakeRings
  }
}
