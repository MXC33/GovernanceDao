
import type { Tile, TileResourceType } from "./useTiles";
import { type LandType, LandTypes } from "./NFTs/useLand";
import { TileGroup } from "./useTiles";
import { PopupTokenInfoAmount } from './usePopupToken';
import { NftFragment } from "#gql";

// type StakeState = 'proposing-place' | 'accepting-place' | 'accepting-removal' | 'accepting-pick-resources' | 'signing' | 'minting'

type ProposedTileRemoval = {
  quantity: number,
  tileGroup: TileGroup
  position: number
}

type ProposedTileStake = {
  tile?: Tile,
  nft: NftFragment
}

type ProposedResourcePick = {
  tiles: Tile[],
  resource: NftFragment,
  quantity: number
  position: number[]
}

const ResourceMap: Record<TileResourceType, number> = {
  'waste': 7,
  'energy': 9
}

export const useProposedNFTStakes = () => {

  const proposedNFTStake = useState<ProposedTileStake | null>('proposed-stake', () => null)

  const proposedNFTRemoval = useState<ProposedTileRemoval | null>('proposed-removal', () => null)

  const proposedResourcePick = useState<ProposedResourcePick | null>('proposed-resource-pick', () => null)


  const proposedNFT = computed(() => {
    if (proposedNFTRemoval.value) {
      const { tileGroup, quantity, position } = proposedNFTRemoval.value
      if (quantity > 1)
        return 'removeAll'
      return tileGroup.assets.length > 0 ? getProposedNFTFromTileGroup(tileGroup, position) : tileGroup.land
    }
    if (proposedNFTStake.value)
      return proposedNFTStake.value.nft

    if (proposedResourcePick.value) {
      return proposedResourcePick.value.resource
    }
  })

  const getProposedNFTFromTileGroup = (tileGroup: TileGroup, position: number) => {
    const hasOnlyStakedOnIndexTwo = tileGroup.assets[0].index == 2
    if (hasOnlyStakedOnIndexTwo)
      return tileGroup.assets[0]
    return tileGroup.assets[position - 1]
  }

  const clearProposedStates = () => {
    proposedNFTStake.value = null
    proposedNFTRemoval.value = null
    proposedResourcePick.value = null
  }

  const proposedTiles = computed(() => {
    if (proposedNFTRemoval.value) {
      const { tileGroup } = proposedNFTRemoval.value
      return tileGroup.tile ? [tileGroup.tile] : []
    }
    if (proposedNFTStake.value) {
      const { tile } = proposedNFTStake.value
      return [tile]
    }

    if (proposedResourcePick.value) {
      return proposedResourcePick.value.tiles
    }
  })

  const proposedStakeNFTType = computed(() => {
    console.log("proposedNFT", proposedNFT.value)
    if (proposedNFT.value == 'removeAll')
      return 'removeAll'

    const type = proposedNFT.value.tokenInfo?.type


    if (!type)
      return null
    if (LandTypes.includes(type as LandType))
      return type == 'pix' ? 'pix' : 'territory'
    else
      return type
  })

  return {
    clearProposedStates,
    proposedTiles,
    proposedStakeNFTType,
    proposedNFT,
    proposedNFTStake,
    proposedNFTRemoval,
    proposedResourcePick
  }
}

export const useStakeNFTFlow = () => {
  const { proposedNFTStake, proposedNFTRemoval, proposedStakeNFTType, proposedNFT, proposedResourcePick } = useProposedNFTStakes()

  const { addPopup } = usePopupToken()

  const { t } = useI18n()
  const { proposeStakeNFT: doProposeStakeNFT, removeNFT, collectFromTiles, clearStaking } = useStakeNFTContracts()

  const isNFTActive = (id: number, type: string) => {
    return proposedNFTStake.value?.nft.tokenId == id && proposedNFTStake.value?.nft?.tokenInfo?.type == type
  }

  const isNFTLandActive = (id: string) => {
    //@ts-ignore
    return proposedNFTStake.value?.nft.title == id
  }

  const proposedStakeType = computed(() => {
    if (proposedNFTRemoval.value != null)
      return 'reset'
    else if (proposedNFTStake.value != null)
      return 'place'
    else if (proposedResourcePick.value != null)
      return 'claim'
    else
      return null
  })

  const confirmStake = () => {
    console.log("CONFIRM STAKE")
    switch (proposedStakeType.value) {
      case 'place':
        return doProposeStakeNFT()
      case 'reset':
        return removeNFT()
      case 'claim':
        return collectFromTiles()
    }
  }

  const selectNFTToStake = (nft: NftFragment) => {
    console.log("SELECT", nft)
    if (proposedNFTStake.value?.nft?.tokenId == nft.tokenId && proposedNFTStake.value?.nft?.tokenInfo?.type == nft.tokenInfo.type) {
      return proposedNFTStake.value = null
    }

    proposedNFTStake.value = { nft }
  }

  const selectNFTLandToStake = (nft: NftFragment) => {
    if (proposedNFTStake.value?.nft?.tokenInfo?.title == nft.tokenInfo?.title)
      return proposedNFTStake.value = null

    proposedNFTStake.value = { nft }
  }

  const showStakePopup = (items: PopupTokenInfoAmount[]) => {
    addPopup({
      title: `${proposedStakeType.value} ${proposedStakeNFTType.value}`,
      message: t(`build.confirm.${proposedStakeType.value}.${proposedStakeNFTType.value}`),
      sender: 'proxy-of-change',
      infoItems: items,
      slideShow: items,
      primaryLink: {
        text: t('general.confirm'),
        fn: () => confirmStake()
      },
      secondaryLink: {
        text: t('general.cancel'),
        fn: () => clearStaking()
      }
    })
  }

  const proposePickResources = async (tiles: Tile[], type: TileResourceType, quantity: number, position: number[]) => {

    const { data, execute: fetchTokenType } = useTokenInfoTypeTier([{ type }])

    await fetchTokenType()
    const resource: NftFragment = data.value[0]


    proposedResourcePick.value = { tiles, resource, quantity, position }

    const items: PopupTokenInfoAmount[] = [{
      infoType: 'amount',
      amount: quantity,
      ...proposedNFT.value as NftFragment
    }]

    showStakePopup(items)
  }

  const proposeStakeNFT = async (tile: Tile) => {
    proposedNFTStake.value.tile = tile

    const items: PopupTokenInfoAmount[] = [{
      infoType: 'amount',
      amount: 1,
      ...proposedNFT.value as NftFragment
    }]

    showStakePopup(items)
  }

  const proposeRemoveNFT = async (tileGroup: TileGroup, quantity: number, position: number) => {
    const { createAmountItems } = usePopupToken()

    proposedNFTRemoval.value = { tileGroup, quantity, position }

    if (quantity == 1) {
      const items: PopupTokenInfoAmount[] = [{
        infoType: 'amount',
        amount: 1,
        ...proposedNFT.value as NftFragment
      }]

      showStakePopup(items)
    } else {

      console.log("remove many nfts")
      const landNft = [tileGroup.land]
      const concatArray = tileGroup.assets
        ? landNft.concat(tileGroup.assets)
        : [tileGroup.land]

      const popupItems = createAmountItems(concatArray)

      showStakePopup(popupItems)
    }
  }

  return {
    proposeRemoveNFT,
    proposeStakeNFT,
    isNFTActive,
    isNFTLandActive,
    selectNFTToStake,
    selectNFTLandToStake,
    confirmStake,
    proposePickResources,
    proposedResourcePick,
    proposedStakeNFTType,
    proposedNFTStake,
    proposedNFTRemoval,
    proposedNFT,
    proposedStakeType,
  }
}
