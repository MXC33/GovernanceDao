import { add } from "date-fns"
import { useLuckyCatGeoLotteryContract } from "~/composables/useLuckyCatGeoLotteryContract";
import { ethers, BigNumber } from "ethers";
import {
  EnteredTickets,
  usePlayerAPI,
  WeeksDraw,
  ActiveRewards
} from "~/composables/api/get/usePlayerAPI";
import { useAstroGoldContract } from "@ix/base/composables/Contract/useAstroGoldContract";
export const weeklyFlowRateConst = 1 / (3600 * 24 * 7)
export const dailyFlowRateConst = 1 / (3600 * 24)

export const useLotteryID = () => {
  const { lotteryID } = useLuckyCatGeoLotteryContract()

  return useAsyncDataState(`lottery-id`, () =>
    lotteryID()
  )
}

export const useLottery = () => {
  const { getActiveRewards: fetchActiveRewards } = usePlayerAPI()

  const { useWeeksDrawData, useEnteredTicketData, fetchMerkleProof, useActiveLotteryData } = usePlayerAPI()
  const { execute: fetchWeeksDrawData, data: weeksDrawData } = useWeeksDrawData()
  const { data: activeLotteryData, execute: fetchActiveLotteryData } = useActiveLotteryData()

  const { data: currentLotteryID, execute: fetchLotteryID } = useLotteryID()
  const { data: ticketData, execute: fetchTicketData } = useEnteredTicketData()
  const { astroGoldBalance, refreshAstroGoldBalance } = useAstroGoldContract()

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

  /*const lotteryEndsAt = computed(() =>
    lotterStartedAt.value && add(lotterStartedAt.value, { days: 7 }).getTime()
  )*/

  const lotteryEndsAt = computed(() =>
    lotterStartedAt.value && add(new Date(1697029350000), { days: 7 }).getTime()
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
    active_rate_live: 0,
    entered_weekly_tickets: 0,
    entered_weekly_tickets_backend: 0,
    next_ticket_percentage: 0,
    funds_last_until: new Date()
  }))

  const getEnteredTickets = async () => {

    try {
      const enteredTicketsResponse = ticketData.value
      if (!enteredTicketsResponse)
        throw new Error("There are no entered tickets!")

      const userLotteryRate = Number(ethers.utils.formatUnits(await userLotteryRateContract(currentLotteryID.value)))

      const ticketPrice = await getTicketPrice()

      await refreshAstroGoldBalance()

      enteredTickets.value = {
        ...enteredTicketsResponse,
        active_rate_live: userLotteryRate,
        entered_weekly_tickets: Math.round((userLotteryRate / weeklyFlowRateConst) / ticketPrice),
        entered_weekly_tickets_backend: Math.round((enteredTicketsResponse.active_rate / weeklyFlowRateConst) / ticketPrice),
        funds_last_until: add(new Date(), { days: Math.round((astroGoldBalance.value || 0) / (enteredTicketsResponse.active_rate / dailyFlowRateConst)) })
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
        entered_weekly_tickets_backend: 0,
        next_ticket_percentage: 0,
        funds_last_until: new Date()
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
        jackpot: 0,
        incomingFlowRate: -1
      }
      throw new Error(CustomErrors.unknownError)
    }
  }
  const getActiveLotteryData = async () => {
    await fetchActiveLotteryData()

    currentLotteryID.value = activeLotteryData.value?.data.id || 0
    lotterStartedAt.value = activeLotteryData.value?.data.start_timestamp ? new Date(activeLotteryData.value?.data.start_timestamp * 1000) : null
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
    getActiveLotteryData,

    fetchActiveLottery,

    claimReward
  };
};



