import {useLuckyCatGeoLotteryContract} from "~/composables/useLuckyCatGeoLotteryContract";
import {ethers} from "ethers";
import {EnteredTickets, usePlayerAPI} from "~/composables/api/get/usePlayerAPI";
export const weeklyFlowRateConst = 1 / (3600 * 24 * 7)
export const useLottery = () => {
  const {
    lotteryID,
    lotteryStartedAt: lotteryStartedAtContract,
    ticketPrice: ticketPriceContract,
    claimReward: claimRewardContract
  } = useLuckyCatGeoLotteryContract()

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
      const enteredTicketsResponse = id ? await getEnteredTickets(id) : await getEnteredTickets(await lotteryID())
      if (!enteredTicketsResponse.data)
        throw new Error("There are no entered tickets!")

      enteredTickets.value = {
        ...enteredTicketsResponse.data,
        entered_weekly_tickets: Math.round((enteredTicketsResponse.data.active_rate / weeklyFlowRateConst) / 6)
      }
      return enteredTickets.value
    } catch (e) {
      enteredTickets.value = {
        entered_tickets: 0,
        entered_stream: 0,
        active_rate: 0,
        entered_weekly_tickets: 0
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

  return {
    lotteryStartedAtDate,
    enteredTickets,
    getEnteredTickets,
    ticketPrice,
    getTicketPrice,
    claimReward
  };
};



