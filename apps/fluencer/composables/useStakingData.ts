import { NftFragment, StakingDataFragment, StakingId } from ".nuxt/gql/default"

export type UserStakingItem = {
  token: NftFragment
  amount?: number
}

export const useStakingData = (id: StakingId) => {
  const credentials = useGraphqlCredentials()

  const fetchStakingData = async () => {
    const stakingData = await GqlStakingData({ credentials, id })
    return stakingData.stakingData as StakingDataFragment
  }

  const key = `staking-data-${id},`

  return useAsyncDataState(key, async () => {
    const result = await fetchStakingData()
    return result ? result : null;
  })
}
