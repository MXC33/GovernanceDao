import { StakingDataFragment, StakingId } from ".nuxt/gql/default"


export const useStakingData = (id: StakingId) => {
  const credentials = useGraphqlCredentials()

  const fetchStakingData = async () => {
    const stakingData = await GqlStakingData({ credentials, id })
    return stakingData.stakingData
  }

  const key = `staking-nft-data-${id},`

  return useAsyncDataState(key, async () => {
    const result = await fetchStakingData()
    return result ? result : null;
  })
}
