import { CorporationAdjustableToken, CorporationPaymentToken } from './useCorporations'
import { TokenWithInfoBlocks } from '../useInfoBlocks'
import { Tile } from '../useTiles'
import { NftFragment } from '#gql'

export interface CorporationRenameItem extends TokenWithInfoBlocks {
  name?: string
}

export interface CorporationRepairItem extends TokenWithInfoBlocks, CorporationAdjustableToken {
  price?: number
  tile?: Tile
}

export const useCorporationRename = () => {
  const activeRenameItem = useState<TokenWithInfoBlocks | null>('corporation-selected-rename', () => null)

  const payToken = useState<CorporationPaymentToken>('rename-pay-token', () => ({
    token: { tokenInfo: { type: 'astro-credit' } },
    value: 0,
    fromUser: true
  }))

  const availableItems = useState<TokenWithInfoBlocks[]>('rename-items', () => [])

  const completion = useCorporationCompletion()

  return {
    payToken,
    ...completion,
    activeRenameItem,
    availableItems
  }
}

export const useCorporationRepair = () => {
  const { repairRoverAC, repairRoverIXT, repairRoverGenesis } = useYSpaceContracts()

  const activeRepairItem = useState<CorporationRepairItem | null>('corporation-selected-repair', () => null)
  const availableItems = useState<CorporationRepairItem[]>('corporation-repair-items', () => [])

  const { isSameNFT } = useNFTs()

  const proposedRepairItems = useState<CorporationRepairItem[]>('corporation-repair-proposed', () => [])

  const payToken = useState<CorporationPaymentToken>('repair-pay-token', () => null)

  const itemIsAdded = (repairItem: CorporationRepairItem) => {
    return !!proposedRepairItems.value.find((item) => isSameNFT(item.token, repairItem.token))
  }

  const toggleRepairItem = (repairItem: CorporationRepairItem) => {
    const activeIndex = proposedRepairItems.value.findIndex((item) => isSameNFT(item.token, repairItem.token))
    if (activeIndex != -1)
      proposedRepairItems.value.splice(activeIndex, 1)
    else
      proposedRepairItems.value.push(repairItem)
  }

  const completion = useCorporationCompletion()

  const hasStakedGenesis = computed(() => balanceOfStakedToken.value > 0)

  const balanceOfStakedToken = useStakedCorporationGenesis("y-space")

  const onRepairSuccess = () => {
    activeRepairItem.value = null
    proposedRepairItems.value = []
    completion.gotoCompleted()
  }

  const repairItems = async () => {

    const repairRovers = async () => {
      if (hasStakedGenesis.value)
        return await repairRoverGenesis(proposedRepairItems.value)

      if (payToken.value.token.tokenInfo?.type == 'astro-credit')
        return await repairRoverAC(proposedRepairItems.value)

      return await repairRoverIXT(proposedRepairItems.value)
    }

    const result = await repairRovers()

    if (result == true) {
      onRepairSuccess()
      return true
    }

    return false
  }

  return {
    payToken,
    ...completion,
    itemIsAdded,
    toggleRepairItem,
    repairItems,
    hasStakedGenesis,
    availableItems,
    proposedRepairItems,
    activeRepairItem
  }
}