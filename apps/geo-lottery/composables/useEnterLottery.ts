import {AdjustableNumber} from "@ix/base/composables/Utils/useAdjustableNumber";
import {MerkleProofsResponse, usePlayerAPI} from "~/composables/api/get/usePlayerAPI";
import {ethers} from "ethers";
import {useLuckyCatGeoLotteryContract} from "~/composables/useLuckyCatGeoLotteryContract";
import {useAstroGoldContract} from "@ix/base/composables/Contract/useAstroGoldContract";

export const MAX_ONE_TIME_ENTRIES = 20

export const useEnterLottery = () => {
  const oneTimeLotteryEntries = useState<AdjustableNumber>('lottery-entries', () => ({
    value: 1,
    min: 1,
    max: MAX_ONE_TIME_ENTRIES
  }))


  const {
    enterLottery: enterLotteryContract,
    enterLotteryFlow: enterLotteryFlowContract,
    removeLotteryFlow: removeLotteryFlowContract,
    ticketPrice: ticketPriceContract,
    territoryStaking: territoryStakingContract,
    claimReward: claimRewardContract,
  } = useLuckyCatGeoLotteryContract()

  const ticketPrice = useState<number>('lottery-ticket-price', () => 0)
  const getTicketPrice = async () => {
    try {
      ticketPrice.value = Number(ethers.utils.formatUnits(await ticketPriceContract()))
      return ticketPrice.value
    } catch (e) {
      ticketPrice.value = 0
      return 0
    }
  }

  const hasTerritories = async () => {
    const { hasTerritories } = usePlayerAPI()

    try {
      const hasTerritory = await hasTerritories()
      if (!hasTerritory.data)
        throw new Error("You don't have territory!")
    } catch (e) {
      throw new Error(CustomErrors.unknownError)
    }
  }

  const enterLottery = async (entries: number) => {
    const { allowanceCheck } = useAstroGoldContract()

    await hasTerritories()
    const ticketPrice = await getTicketPrice()
    if (!await allowanceCheck(ticketPrice * entries))
      throw new Error(CustomErrors.allowanceError)

    return await enterLotteryContract(entries)
  }

  const enterLotteryFlow = async (entries: number) => {

    await hasTerritories()
    const ticketPrice = await getTicketPrice()
    await enterLotteryFlowContract(ticketPrice * entries)
  }

  const removeLotteryFlow = async () => {
    await removeLotteryFlowContract()
  }

  const getMerkleProofs = async (id: number) => {
    const { getMerkleProofs } = usePlayerAPI()

    try {
      const merkleProofs = await getMerkleProofs(id)
      if (!merkleProofs.data)
        throw new Error("There are no merkle proofs!")

      return merkleProofs.data
    } catch (e) {
      throw new Error(CustomErrors.unknownError)
    }
  }

  const claimReward = async (id: number) => {
    const merkleProofs = await getMerkleProofs(id)

    return await claimRewardContract(id, merkleProofs)
  }

  return {
    oneTimeLotteryEntries,
    ticketPrice,
    getTicketPrice,
    enterLottery,
    enterLotteryFlow,
    removeLotteryFlow,
    claimReward
  }
}
