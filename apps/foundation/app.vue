<template lang="pug">
#app.antialiased(font="gridnik" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    NuxtLoadingIndicator(color="#84D4BC")

    NuxtPage()

    div#takeover

    //- CookieBot(:id="cookieBotId")
</template>

<script setup lang="ts">
import { StakingId } from '.nuxt/gql/default';

const { setupOnMounted } = useAppSetup()
const { isLoggedInAndConnected } = useLogin()
const { walletSigningToken, walletAdress } = useWallet()



const { execute: fetchTerritoryData, refresh: refreshTerritoryData } = useStakingData(StakingId.Territories)
const { execute: fetchTerritoryUserData, refresh: refreshTerritoryUserData } = useStakingData(StakingId.TerritoriesUser)
const { execute: fetchMetashareData, refresh: refreshMetashareData } = useStakingData(StakingId.Metashare)
const { execute: fetchEnergyData, refresh: refreshEnergyData } = useStakingData(StakingId.Energy)
const { execute: fetchEnergyAmeliaData, refresh: refreshEnergyAmeliaData } = useStakingData(StakingId.EnergyAmelia)
const { execute: fetchIXTOneMonthData, refresh: refreshIXTOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { execute: fetchIXTThreeMonthData, refresh: refreshIXTThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { execute: fetchIXTSixMonthData, refresh: refreshIXTSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { execute: fetchIXTTwelveMonthData, refresh: refreshIXTTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)
const { execute: fetchLandmarkData, refresh: refreshLandmarkData } = useStakingData(StakingId.Landmark)
const { execute: fetchLPMatic, refresh: refreshLPMatic } = useStakingData(StakingId.LpMATIC)
const { execute: fetchLPUsdt, refresh: refreshLPUsdt } = useStakingData(StakingId.LpUSDT)


useHead({
  title: "Foundation | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})

const refreshAllData = async () => {
  await Promise.all([
    refreshTerritoryData(),
    refreshTerritoryUserData(),
    refreshMetashareData(),
    refreshEnergyData(),
    refreshEnergyAmeliaData(),
    refreshIXTOneMonthData(),
    refreshIXTThreeMonthData(),
    refreshIXTSixMonthData(),
    refreshIXTTwelveMonthData(),
    refreshLandmarkData(),
    refreshLPMatic(),
    refreshLPUsdt()
  ])
}

await Promise.all([
  fetchTerritoryData(),
  fetchTerritoryUserData(),
  fetchMetashareData(),
  fetchEnergyData(),
  fetchEnergyAmeliaData(),
  fetchIXTOneMonthData(),
  fetchIXTThreeMonthData(),
  fetchIXTSixMonthData(),
  fetchIXTTwelveMonthData(),
  fetchLandmarkData(),
  fetchLPMatic(),
  fetchLPUsdt()
])

watch(isLoggedInAndConnected, async (loggedIn) => {
  if (!loggedIn)
    return

  const walletHeaders = {
    'X-Wallet': walletAdress.value ?? "",
    'X-Signing-Token': walletSigningToken.value ?? ""
  }

  useGqlHeaders(walletHeaders)
  await refreshAllData()
})


</script>

<style>
body,
html {
  background: #0C0C0C;
}
</style>
