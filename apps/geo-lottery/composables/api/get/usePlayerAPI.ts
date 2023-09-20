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
  prize: number
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
  jackpot: number
}

export interface ActiveRewardsResponse extends ObjectResponse {
  data: ActiveRewards
}

export const usePlayerAPI = () => {
  const { fetchIXAPI } = useIXAPI()

  const hasTerritories = () => fetchIXAPI('territories/has') as Promise<HasTerritoriesResponse>
  const getMerkleProofs = (id: number) => fetchIXAPI('geo/lottery/claim/data/' + id) as Promise<MerkleProofsResponse>
  const getEnteredTickets = (id: number) => fetchIXAPI('geo/lottery/ticket/entries/' + id) as Promise<EnteredTicketsResponse>

  const useWeeksDrawData = () => useAsyncDataState('weeks-draw', () =>
    fetchIXAPI('geo/lottery/details/table') as Promise<WeeksDrawResponse>
  )
  const getActiveRewards = () => fetchIXAPI('geo/lottery/active/rewards') as Promise<ActiveRewardsResponse>

  return {
    hasTerritories,
    getMerkleProofs,
    getEnteredTickets,
    useWeeksDrawData,
    getActiveRewards
  }
}
