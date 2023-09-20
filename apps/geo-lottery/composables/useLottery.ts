import {useLuckyCatGeoLotteryContract} from "~/composables/useLuckyCatGeoLotteryContract";
import {ethers} from "ethers";
import {
  EnteredTickets,
  usePlayerAPI,
  WeeksDraw
} from "~/composables/api/get/usePlayerAPI";
export const weeklyFlowRateConst = 1 / (3600 * 24 * 7)
export const useLottery = () => {
  const {
    lotteryID,
    lotteryStartedAt: lotteryStartedAtContract,
    ticketPrice: ticketPriceContract,
    claimReward: claimRewardContract,
    userLotteryRate: userLotteryRateContract,
  } = useLuckyCatGeoLotteryContract()

  // const lotteryStartDate = useState<Date>('lottery-start-date', () => new Date(1694782800000))
  const lotteryStartDate = useState<Date>('lottery-start-date', () => new Date(1695211200000))
  const isLotteryActive = useState<boolean>('lottery-active', () => false)
  const checkLotteryActive = () => {
    const now = new Date()
    const diff = lotteryStartDate.value.getTime() - now.getTime()
    isLotteryActive.value = diff < 0
  }

  const lotteryStartedAtDate = async () => {
    const startedAt = Number(await lotteryStartedAtContract(await lotteryID()))
    return new Date(startedAt * 1000)
  }

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

  const enteredTickets = useState<EnteredTickets>('lottery-entered-tickets', () => ({
    entered_tickets: 0,
    entered_stream: 0,
    active_rate: 0,
    entered_weekly_tickets: 0
  }))
  const getEnteredTickets = async (id?: number) => {
    const { getEnteredTickets } = usePlayerAPI()

    try {
      const currentLotteryID = await lotteryID()
      const enteredTicketsResponse = id ? await getEnteredTickets(id) : await getEnteredTickets(currentLotteryID)
      if (!enteredTicketsResponse.data)
        throw new Error("There are no entered tickets!")

      const userLotteryRate = Number(ethers.utils.formatUnits(await userLotteryRateContract(currentLotteryID)))

      enteredTickets.value = {
        ...enteredTicketsResponse.data,
        active_rate_live: userLotteryRate,
        entered_weekly_tickets: Math.round((userLotteryRate / weeklyFlowRateConst) / 6),
        entered_weekly_tickets_backend: Math.round((enteredTicketsResponse.data.active_rate / weeklyFlowRateConst) / 6)
      }
      return enteredTickets.value
    } catch (e) {
      enteredTickets.value = {
        entered_tickets: 0,
        entered_stream: 0,
        active_rate: 0,
        active_rate_live: 0,
        entered_weekly_tickets: 0,
        entered_weekly_tickets_backend: 0
      }
      throw new Error(CustomErrors.unknownError)
    }
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

  const weeksDraw = useState<WeeksDraw>('lottery-weeks-draw', () => ({
    last_drawn_lottery: null,
    jackpot: null,
    rounds: []
  }))
  const getWeeksDraw = async () => {
    const { getWeeksDraw } = usePlayerAPI()

    try {
      const weeksDrawResponse = await getWeeksDraw()
      if (!weeksDrawResponse.data)
        throw new Error("There are no data!")

      weeksDraw.value = weeksDrawResponse.data
      return weeksDraw.value
    } catch (e) {
      weeksDraw.value = {
        last_drawn_lottery: null,
        jackpot: null,
        rounds: []
      }
      throw new Error(CustomErrors.unknownError)
    }
  }

  return {
    lotteryStartDate,
    isLotteryActive,
    checkLotteryActive,

    lotteryStartedAtDate,
    enteredTickets,
    getEnteredTickets,

    ticketPrice,
    getTicketPrice,

    weeksDraw,
    getWeeksDraw,

    claimReward
  };
};



