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

export const usePlayerAPI = () => {
  const { fetchIXAPI } = useIXAPI()

  const hasTerritories = () => fetchIXAPI('territories/has') as Promise<HasTerritoriesResponse>
  const getMerkleProofs = (id: number) => fetchIXAPI('geo/lottery/claim/data/' + id) as Promise<MerkleProofsResponse>

  return {
    hasTerritories,
    getMerkleProofs
  }
}
