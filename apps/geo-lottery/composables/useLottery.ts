import { add } from "date-fns"
import { useLuckyCatGeoLotteryContract } from "~/composables/useLuckyCatGeoLotteryContract";
import { ethers, BigNumber } from "ethers";
import {
  EnteredTickets,
  usePlayerAPI,
  WeeksDraw,
  ActiveRewards
} from "~/composables/api/get/usePlayerAPI";
export const weeklyFlowRateConst = 1 / (3600 * 24 * 7)

export const useLotteryID = () => {
  const { lotteryID } = useLuckyCatGeoLotteryContract()

  return useAsyncDataState(`lottery-id`, () =>
    lotteryID()
  )
}

export const useLottery = () => {
  const { getActiveRewards: fetchActiveRewards } = usePlayerAPI()

  const { useWeeksDrawData, useEnteredTicketData, fetchMerkleProof } = usePlayerAPI()
  const { execute: fetchWeeksDrawData, data: weeksDrawData } = useWeeksDrawData()

  const { data: currentLotteryID, execute: fetchLotteryID } = useLotteryID()
  const { data: ticketData, execute: fetchTicketData } = useEnteredTicketData()

  const {
    lotteryStartedAt: lotteryStartedAtContract,
    ticketPrice: ticketPriceContract,
    claimReward: claimRewardContract,
    userLotteryRate: userLotteryRateContract,
  } = useLuckyCatGeoLotteryContract()

  // const lotteryStartDate = useState<Date>('lottery-start-date', () => new Date(1694782800000))
  const lotteryStartDate = useState<Date>('lottery-start-date', () => new Date(1695211200000))

  const { data: lotterStartedAt, refresh: updateStartedState } = useAsyncDataState('current-started-at', async () => {
    const started = await lotteryStartedAtContract(currentLotteryID.value)
    const startedAt = Number(started)
    return new Date(startedAt * 1000)
  })

  const isLotteryActive = computed(() => {
    const now = new Date()
    const diff = lotteryStartDate.value.getTime() - now.getTime()
    return diff < 0
  })

  const ticketPrice = useState<number>('lottery-ticket-price', () => 0)

  const lotteryEndsAt = computed(() =>
    lotterStartedAt.value && add(lotterStartedAt.value, { days: 7 }).getTime()
  )

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

  const getEnteredTickets = async () => {

    try {
      const enteredTicketsResponse = ticketData.value
      if (!enteredTicketsResponse)
        throw new Error("There are no entered tickets!")

      const userLotteryRate = Number(ethers.utils.formatUnits(await userLotteryRateContract(currentLotteryID.value)))

      const ticketPrice = await getTicketPrice()

      enteredTickets.value = {
        ...enteredTicketsResponse,
        active_rate_live: userLotteryRate,
        entered_weekly_tickets: Math.round((userLotteryRate / weeklyFlowRateConst) / ticketPrice),
        entered_weekly_tickets_backend: Math.round((enteredTicketsResponse.active_rate / weeklyFlowRateConst) / ticketPrice)
      }
      return enteredTickets.value
    } catch (e) {
      console.log("ERR", e)
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
    try {
      const merkleProofs = await fetchMerkleProof(id)
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

  const fetchActiveLottery = async () => {
    await fetchLotteryID()
    // console.log("FETCH TICKET", currentLotteryID.value.toNumber())
    await Promise.all([updateStartedState(), fetchTicketData()])

    return Promise.all([getWeeksDraw(), getEnteredTickets()])
  }

  const getWeeksDraw = async () => {

    try {
      await fetchWeeksDrawData()

      if (!weeksDrawData.value?.data)
        throw new Error("There are no data!")

      weeksDraw.value = weeksDrawData.value.data
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

  const activeRewards = useState<ActiveRewards>('lottery-active-rewards', () => ({
    rewards: 0,
    jackpot: 0
  }))
  const getActiveRewards = async () => {

    try {
      const activeRewardsResponse = await fetchActiveRewards()
      if (!activeRewardsResponse.data)
        throw new Error("There are no data!")

      activeRewards.value = activeRewardsResponse.data
      return activeRewards.value
    } catch (e) {
      activeRewards.value = {
        rewards: 0,
        jackpot: 0
      }
      throw new Error(CustomErrors.unknownError)
    }
  }

  return {
    lotteryStartDate,

    isLotteryActive,

    lotterStartedAt,
    lotteryEndsAt,

    enteredTickets,
    getEnteredTickets,

    ticketPrice,
    getTicketPrice,

    weeksDraw,
    getWeeksDraw,

    activeRewards,
    getActiveRewards,

    fetchActiveLottery,

    claimReward
  };
};



