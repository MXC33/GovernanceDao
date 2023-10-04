<template lang="pug">
#app.antialiased.geo-lottery(font="foundry" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow" min-h="100vh")
  NuxtLayout()
    VList(flex-grow="1")
      NuxtLoadingIndicator(color="rgb(255, 102, 71)")

      NuxtPage()

      PopupList()

      HoverInfoBox()

      div#takeover

      SnackbarList()

      Popup(v-if="isSwapVisible" @close="isSwapVisible = false" :disable-default-close="true")
        template(#header) {{ $t(`marketplace.navigation.buy.swap.title`)}}
        template(#default)
          VList(w="full" justify="center" items="center" )
            iframe(src="https://ix.foundation/lefi" w="full" h="full" min-h="118")

</template>

<script setup lang="ts">
const { fetchActiveLottery } = useLottery()
const { isLotteryActive, getActiveLotteryData, getActiveRewards } = useLottery()

const { setupOnMounted } = useAppSetup()
const { state: isSwapVisible } = useIXTSwapVisible()

useHead({
  title: "Territory Lottery | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})


watch(isLotteryActive, (state) => {
  console.log("Lottery active", state)
}, { immediate: true })


onMounted(() => {
  setupOnMounted(async () => {
    await getActiveLotteryData()
    await fetchActiveLottery()
    await getActiveRewards()

  })
})


</script>

<style>
body,
html {
  background: #000;
}

#app {
  --header-background: var(--mc-pink);
  --header-orange: white;
  --header-mint: white;
  --header-text: var(--ix-black);
}
</style>
