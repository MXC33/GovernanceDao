import { CredentialsInput, NftFragment, StakingDataFragment, StakingId, UserSpecificStakingDataFragment } from "~/.nuxt/gql/default"
import { MaybeRef } from "@vueuse/core";
import { get } from '@vueuse/core'

export type UserStakingItem = {
  token: NftFragment
  amount?: number
}

export const useStakingPools = () => {

  const { fetchIXAPI } = useIXAPI()

  const { data: dataTerritory } = useStakingData(StakingId.Territories)
  const { data: dataTerritoryUser } = useStakingData(StakingId.TerritoriesUser)
  const { data: dataMetashare } = useStakingData(StakingId.Metashare)
  const { data: dataEnergy } = useStakingData(StakingId.Energy)
  const { data: dataEnergyAmelia } = useStakingData(StakingId.EnergyAmelia)
  const { data: dataIXTOneMonth } = useStakingData(StakingId.IxtOneMonth)
  const { data: dataIXTThreeMonth } = useStakingData(StakingId.IxtThreeMonths)
  const { data: dataIXTSixMonth } = useStakingData(StakingId.IxtSixMonths)
  const { data: dataIXTTwelveMonth } = useStakingData(StakingId.IxtTwelveMonths)
  const { data: dataLandmark } = useStakingData(StakingId.Landmark)
  const { data: dataLPMatic } = useStakingData(StakingId.LpMATIC)
  const { data: dataLPUsdt } = useStakingData(StakingId.LpUSDT)


  const ixtPoolData = computed(() => {
    return [
      {
        month: 1,
        data: dataIXTOneMonth.value
      }, {
        month: 3,
        data: dataIXTThreeMonth.value
      }, {
        month: 6,
        data: dataIXTSixMonth.value
      }, {
        month: 12,
        data: dataIXTTwelveMonth.value
      }]
  })

  const totalIXTRewards = computed(() => {
    const userData = ixtPoolData.value.map(item => item?.data?.userSpecificStakingData)

    return {
      totalUserReward: userData.reduce((a, b) => a + (b?.totalUserReward ?? 0), 0),
      totalUserRewardPerDay: userData.reduce((a, b) => a + (b?.totalUserRewardPerDay ?? 0), 0),
      totalUserRewardPerThirtyDays: userData.reduce((a, b) => a + (b?.totalUserRewardPerThirtyDays ?? 0), 0)
    }
  })

  const totalUserRewards = computed(() => {
    const stakingList = [dataTerritoryUser.value, dataMetashare.value, dataEnergy.value, dataLandmark.value]

    return [...stakingList.map(item => item?.userSpecificStakingData).filter(Boolean), totalIXTRewards.value]
  })

  const getDashboardTableRow = (id: string, data?: UserSpecificStakingDataFragment | null | undefined) => {
    return {
      id,
      daily: data?.totalUserRewardPerDay ?? 0,
      thirtyDays: data?.totalUserRewardPerThirtyDays ?? 0
    }
  }

  const dashboardTableData = computed(() => {
    return [
      getDashboardTableRow('energy', dataEnergy.value?.userSpecificStakingData),
      getDashboardTableRow('landmark', dataLandmark.value?.userSpecificStakingData),
      getDashboardTableRow('territory', dataTerritoryUser.value?.userSpecificStakingData),
      getDashboardTableRow('metashare', dataMetashare.value?.userSpecificStakingData),
      getDashboardTableRow('ixt', totalIXTRewards.value)
    ]
  })


  const getTotalSupply = async () => {
    const response = await $fetch("https://api.coingecko.com/api/v3/coins/ix-token")
    return Number(response.market_data.total_supply)
  }

  const getCirculatingSupply = async () => {
    const response = await fetchIXAPI("web3/circulating-supply")
    return Number(response)
  }

  const getAPY = (data: StakingDataFragment) => {
    if (!data.stakingItems)
      return 0
    const rewardRate = data.stakingItems[0]?.rewardRate ?? 0
    const totalSupply = data.totalStakedAmount ?? 1
    const APR = (rewardRate * 86400 * 365) / totalSupply;
    return roundToDecimals(((1 + APR / 365) ** 365 - 1) * 100, 2)
  }

  return {
    totalIXTRewards,
    totalUserRewards,
    dashboardTableData,
    ixtPoolData,
    getAPY,
    getTotalSupply,
    getCirculatingSupply
  }
}
