import { CredentialsInput } from "#gql"
import { LandmarkSort, LandmarkTier } from ".nuxt/gql/default"

export const useLandmarkData = () =>
  useAsyncDataState('landmarks-data', async () => {
    const credentials: CredentialsInput = {
      playerId: 0,
      walletAddress: "0x259b74693B732CC5591827170F625ea6De4a559F"
    }
    const landmark = await GqlLandmarks({ credentials })
    return landmark.landmarks
  })


export const useAllLandmarkData = (page: number | null, searchWord: string | null, filter: LandmarkTier | null, order: LandmarkSort | null) => {
  const fetchLandmarks = async () => {
    const landmarks = await GqlAllLandmarks({ page, searchWord, filter, order })
    return landmarks.allLandmarks
  }

  const key = `landmark-data-${page}-${searchWord}-${filter}-${order}`

  return useAsyncDataState(key, async () => {
    const result = await fetchLandmarks()
    return result ? result : null;
  })
}