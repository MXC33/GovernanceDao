import { TokenTypeTier } from "./useTokenInfo"

export const useGravityGradePackContentData = (token: TokenTypeTier) => {
  const key = `${token.type}-${token.tier}`

  return useAsyncState(`gg-pack-info-data-${key}`, async () => {

    try {
      return await GqlGGPackContent({ token })
    } catch (error) {
      console.log("Error fetching", error)
      return null
    }
  }, {
    transform: (data) => data.gravityGradePackContent
  })
}