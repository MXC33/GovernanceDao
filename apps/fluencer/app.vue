<template lang="pug">
#app.antialiased(font="gridnik" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    NuxtLoadingIndicator(color="#84D4BC")

    NuxtPage()

    div#takeover

    SnackNotifications(:notifications="snackNotifications")

</template>

<script setup lang="ts">
import { StakingId } from '.nuxt/gql/default';

const { setupOnMounted } = useAppSetup()
const { refresh: fetchIXTOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { refresh: fetchIXTThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { refresh: fetchIXTSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { refresh: fetchIXTTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)
const { refresh: fetchMetashareData } = useStakingData(StakingId.Metashare)
const { refresh: fetchVoucherTokens } = useVoucherData()
const { refresh: fetchTokens } = useTokenData()

const { snackNotifications } = useSnackNotifications()

useHead({
  title: "Fluencer | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})

onMounted(() => {
  setupOnMounted(async () => {
    console.log("FETCHING DATA")
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
