import {AdjustableNumber} from "@ix/base/composables/Utils/useAdjustableNumber";
import {usePlayerAPI} from "~/composables/api/get/usePlayerAPI";
import {useLuckyCatGeoLotteryContract} from "~/composables/useLuckyCatGeoLotteryContract";
import {useLottery} from "~/composables/useLottery";

export const useSubscription = () => {
  const { hasTerritories: hasTerritoriesData } = usePlayerAPI()

  const maxSubscriptionEntries = useState<number>('max-subscription-entries', () => 30)
  const setMaxSubscriptionEntries = (entries: number) => {
    maxSubscriptionEntries.value = entries
  }

  const { enteredTickets } = useLottery()
  const subscriptionEntries = useState<AdjustableNumber>('subscription-entries', () => ({
    value: 1,
    min: 1,
    max: computed<number>(() => {
      return maxSubscriptionEntries.value - (enteredTickets.value.entered_weekly_tickets || 0)
    })
  }))

  const {
    enterLotteryFlow: enterLotteryFlowContract,
    updateLotteryFlow: updateLotteryFlowContract,
    removeLotteryFlow: removeLotteryFlowContract
  } = useLuckyCatGeoLotteryContract()

  const { getTicketPrice } = useLottery()

  const hasTerritories = async () => {
    let hasError: string | boolean = false
    try {
      const hasTerritory = await hasTerritoriesData()
      if (!hasTerritory.data)
        hasError = 'You don\'t have territory!'
    } catch (e) {
      hasError = CustomErrors.unknownError
    }

    if (hasError)
      throw new Error(hasError)
  }

  const enterLotteryFlow = async (entries: number) => {

    await hasTerritories()
    const ticketPrice = await getTicketPrice()
    await enterLotteryFlowContract(ticketPrice * entries)
  }

  const updateLotteryFlow = async (entries: number) => {
    const { getEnteredTickets, enteredTickets } = useLottery()

    await hasTerritories()
    const ticketPrice = await getTicketPrice()
    await getEnteredTickets()
    await updateLotteryFlowContract(ticketPrice * (entries + (enteredTickets.value.entered_weekly_tickets || 0)))
  }

  const removeLotteryFlow = async () => {
    await removeLotteryFlowContract()
  }

  return {
    subscriptionEntries,
    maxSubscriptionEntries,
    setMaxSubscriptionEntries,
    enterLotteryFlow,
    updateLotteryFlow,
    removeLotteryFlow
  }
}
