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

export const usePlayerAPI = () => {
  const { fetchIXAPI } = useIXAPI()

  const hasTerritories = () => fetchIXAPI('territories/has') as Promise<HasTerritoriesResponse>
  const getMerkleProofs = (id: number) => fetchIXAPI('geo/lottery/claim/data/' + id) as Promise<MerkleProofsResponse>
  const getEnteredTickets = (id: number) => fetchIXAPI('geo/lottery/ticket/entries/' + id) as Promise<EnteredTicketsResponse>

  const useWeeksDrawData = () => useAsyncDataState('weeks-draw', () =>
    fetchIXAPI('geo/lottery/details/table') as Promise<WeeksDrawResponse>
  )

  /*const getWeeksDraw = () => {
    return {
      data: {
        "last_drawn_lottery": {
          "id": 1,
          "country_code": "AG",
          "tier_name": "Rare",
          "type_name": "AREA",
          "claimed": false,
          "entries": {
            "entered_tickets": 0,
            "entered_stream": 0,
            "active_rate": 0
          },
          "nft_link": "https://api.planetix.com/api/v1/geo/lottery/token/2/animation_url",
          "winning_pools": [
            6
          ]
        },
        "jackpot": {
          "lon": 16.78510171155365,
          "lat": 21.314579407145388,
          "has_winner": false,
          "player_id": null
        },
        "rounds": [
          {
            "id": 1,
            "country_code": "AG",
            "tier_name": "Rare",
            "type_name": "AREA",
            "winners": 2,
            "total_tickets": 7,
            "your_tickets": 3,
            "prize": 2.507142857142857,
            "claimed": false,
            "nft_link": "https://api.planetix.com/api/v1/geo/lottery/token/2/animation_url",
            "winning_pools": [
              6
            ]
          }
        ]
      }
    }
  }*/

  return {
    hasTerritories,
    getMerkleProofs,
    getEnteredTickets,
    useWeeksDrawData
  }
}
