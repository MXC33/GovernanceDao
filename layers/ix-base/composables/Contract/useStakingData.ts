import { CredentialsInput, NftFragment, StakingId } from ".nuxt/gql/default"

export type UserStakingItem = {
  token: NftFragment
  amount?: number
}

export const useStakingData = (id: StakingId) => {
  // const credentials = useGraphqlCredentials()
  const credentials: CredentialsInput = {
    playerId: 0,
    walletAddress: "0x259b74693B732CC5591827170F625ea6De4a559F"
  }

  const fetchStakingData = async () => {
    const stakingData = await GqlStakingData({ credentials, id })
    return stakingData.stakingData
  }

  const key = `staking-data-${id},`

  return useAsyncDataState(key, async () => {
    const result = await fetchStakingData()
    return result ? result : null;
  })
}
