import { useLotteryID } from "~/composables/useLottery"

export interface ObjectResponse {
  success: boolean,
  status: number,
  message: string,
  data: any
}

export interface HasTerritoriesResponse extends ObjectResponse {
  data: boolean
}

export interface MerkleProofsResponse extends ObjectResponse {
  data: string[][]
}

export interface EnteredTickets {
  entered_tickets: number,
  entered_stream: number,
  active_rate: number,
  active_rate_live?: number,
  entered_weekly_tickets?: number
  entered_weekly_tickets_backend?: number
}

export interface EnteredTicketsResponse extends ObjectResponse {
  data: EnteredTickets
}

export interface LastDrawLottery {
  id: number,
  country_code: string,
  tier_name: string,
  type_name: string,
  claimed: boolean,
  prize: number,
  entries: {
    entered_tickets: number,
    entered_stream: number,
    active_rate: number
  },
  winning_pools?: number[],
  nft_link?: string
}

export interface Jackpot {
  lon: number,
  lat: number,
  has_winner: boolean,
  player_id: number | null
}

export interface Round {
  id: number,
  country_code: string,
  tier_name: string,
  type_name: string,
  winners: number,
  your_tickets: number,
  total_tickets: number,
  prize: number,
  claimed: boolean,
  nft_link: string,
  winning_pools?: number[]
}

export interface WeeksDraw {
  last_drawn_lottery: LastDrawLottery | null,
  jackpot: Jackpot | null,
  rounds: Round[]
}

export interface WeeksDrawResponse extends ObjectResponse {
  data: WeeksDraw
}

export interface ActiveRewards {
  rewards: number,
  jackpot: number,
  incomingFlowRate?: number,
}

export interface ActiveRewardsResponse extends ObjectResponse {
  data: ActiveRewards
}

export interface ActiveLotteryData {
  id: number,
  start_timestamp: number
}
export interface ActiveLotteryDataResponse extends ObjectResponse {
  data: ActiveLotteryData
}

export const usePlayerAPI = () => {
  const { fetchIXAPI } = useIXAPI()

  const hasTerritories = () => fetchIXAPI('territories/has') as Promise<HasTerritoriesResponse>

  const fetchMerkleProof = (id: number) =>
    fetchIXAPI('geo/lottery/claim/data/' + id) as Promise<MerkleProofsResponse>

  const useEnteredTicketData = () => {
    const { data: lotteryID } = useLotteryID()

    return useAsyncDataState(`lottery-entered-tickets`, () => {
      const data = fetchIXAPI('geo/lottery/ticket/entries/' + lotteryID.value) as Promise<EnteredTicketsResponse>
      return data
    }, {
      transform: (data) => data.data
    })
  }


  const useWeeksDrawData = () => useAsyncDataState('weeks-draw', () =>
    fetchIXAPI('geo/lottery/details/table') as Promise<WeeksDrawResponse>, {
      transform: (response) => {
        if (
          response.data &&
          response.data.last_drawn_lottery &&
          response.data.last_drawn_lottery.id &&
          response.data.rounds &&
          response.data.rounds.findIndex(round => round.id === response.data.last_drawn_lottery?.id) != -1
        ) {
          const modifiedLastDrawnLottery = response.data.last_drawn_lottery
          const round = response.data.rounds.find(round => round.id === response.data.last_drawn_lottery?.id)
          if (round) {
            modifiedLastDrawnLottery.prize = round.prize

            return {
              ...response,
              data: {
                ... response.data,
                last_drawn_lottery: modifiedLastDrawnLottery
              }
            }
          }
        }

        return response
      }
    }
  )
  const getActiveRewards = () => fetchIXAPI('geo/lottery/active/rewards') as Promise<ActiveRewardsResponse>
  const useActiveLotteryData = () => {
    return useAsyncDataState(`lottery-active-data`, () => {
      const data = fetchIXAPI('geo/lottery/active/data') as Promise<ActiveLotteryDataResponse>
      return data
    })
  }

  return {
    hasTerritories,
    useWeeksDrawData,
    getActiveRewards,
    fetchMerkleProof,
    useEnteredTicketData,
    useActiveLotteryData
  }
}
