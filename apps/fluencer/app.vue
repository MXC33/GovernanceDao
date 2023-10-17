<template lang="pug">
#app.antialiased(font="gridnik" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    NuxtLoadingIndicator(color="#84D4BC")

    NuxtPage()

    div#takeover

    //- CookieBot(:id="cookieBotId")
    SnackNotifications(:notifications="snackNotifications")
    
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
const { execute: fetchTokens } = useTokenData()

const { snackNotifications } = useSnackNotifications()

useHead({
  title: "Fluencer | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})

onMounted(() => {
  setupOnMounted(async () => {
    await Promise.all([
      fetchTokens(),
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

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
