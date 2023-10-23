import { NftFragment, StakingDataFragment, StakingId } from ".nuxt/gql/default"

export type UserStakingItem = {
  token: NftFragment
  amount?: number
}

export const useStakingHelper = () => {

  const formattedMonths = (months: number) => {
    if (months == 12)
      return "1 Year"

    if (months == 1)
      return "1 Month"

    return `${months} Months`
  }

  return {
    formattedMonths
  }
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
