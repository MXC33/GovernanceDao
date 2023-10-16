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
const { execute: fetchIXTOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { execute: fetchIXTThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { execute: fetchIXTSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { execute: fetchIXTTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)
const { execute: fetchMetashareData } = useStakingData(StakingId.Metashare)
const { execute: fetchVoucherTokens } = useVoucherData()



useHead({
  title: "Fluencer | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})

onMounted(() => {
  setupOnMounted(async () => {
    await Promise.all([
      fetchVoucherTokens(),
      fetchIXTOneMonthData(),
      fetchIXTThreeMonthData(),
      fetchIXTSixMonthData(),
      fetchIXTTwelveMonthData(),
      fetchMetashareData(),
    ])
  })
})


</script>

<style>
body,
html {
  background: #0C0C0C;
}
</style>
