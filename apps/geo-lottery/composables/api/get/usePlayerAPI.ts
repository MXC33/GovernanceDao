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
  entered_weekly_tickets?: number
}
export interface EnteredTicketsResponse extends ObjectResponse {
  data: EnteredTickets
}

export const usePlayerAPI = () => {
  const { fetchIXAPI } = useIXAPI()

  const hasTerritories = () => fetchIXAPI('territories/has') as Promise<HasTerritoriesResponse>
  const getMerkleProofs = (id: number) => fetchIXAPI('geo/lottery/claim/data/' + id) as Promise<MerkleProofsResponse>
  const getEnteredTickets = (id: number) => fetchIXAPI('geo/lottery/ticket/entries/' + id) as Promise<EnteredTicketsResponse>

  return {
    hasTerritories,
    getMerkleProofs,
    getEnteredTickets
  }
}
