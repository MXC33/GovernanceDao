import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber";
import { MerkleProofsResponse, usePlayerAPI } from "~/composables/api/get/usePlayerAPI";
import { useLuckyCatGeoLotteryContract } from "~/composables/useLuckyCatGeoLotteryContract";
import { useAstroGoldContract } from "@ix/base/composables/Contract/useAstroGoldContract";
import { useLottery } from "~/composables/useLottery";

export const useEnterLottery = () => {
  const { hasTerritories: hasTerritoriesData } = usePlayerAPI()
  const { allowanceCheck } = useAstroGoldContract()

  const maxOneTimeEntries = useState<number>('max-one-time-entries', () => 20)
  const setMaxOneTimeEntries = (entries: number) => {
    maxOneTimeEntries.value = entries
  }

  const { enteredTickets } = useLottery()

  const maxLotteryEntries = computed(() => maxOneTimeEntries.value - enteredTickets.value?.entered_tickets ?? 0)

  const oneTimeLotteryEntries = useState<AdjustableNumber>('lottery-entries', () => ({
    value: 1,
    min: 1,
    max: maxLotteryEntries.value
  }))

  watch([maxOneTimeEntries, enteredTickets], () => {
    oneTimeLotteryEntries.value.max = maxLotteryEntries.value
  })

  const {
    enterLottery: enterLotteryContract
  } = useLuckyCatGeoLotteryContract()

  const { getTicketPrice } = useLottery()

  const hasTerritories = async () => {
    try {
      const hasTerritory = await hasTerritoriesData()
      if (!hasTerritory.data)
        throw new Error("You don't have territory!")
    } catch (e) {
      throw new Error(CustomErrors.unknownError)
    }
  }

  const enterLottery = async (entries: number) => {

    await hasTerritories()
    const ticketPrice = await getTicketPrice()
    if (!await allowanceCheck(ticketPrice * entries))
      throw new Error(CustomErrors.allowanceError)

    return await enterLotteryContract(entries)
  }

  return {
    oneTimeLotteryEntries,
    maxOneTimeEntries,
    setMaxOneTimeEntries,
    enterLottery
  }
}
