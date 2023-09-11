<template lang="pug">
#app.antialiased(font="foundry" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    VList()
      NuxtLoadingIndicator(color="rgb(255, 102, 71)")

      NuxtPage()

      PopupList()

      div#infobox(:style="values" z="901" pos="absolute")

      div#takeover

      SnackbarList()

      Popup(v-if="isSwapVisible" @close="isSwapVisible = false" :disable-default-close="true")
        template(#header) {{ $t(`marketplace.navigation.buy.swap.title`)}}
        template(#default)
          VList(w="full" justify="center" items="center" )
            iframe(src="https://ix.foundation/lefi" w="full" h="full" min-h="118")



</template>

<script setup lang="ts">
import {useGlobalWindowScroll} from "@ix/base/composables/useWindowScroll";
import {useAstroGoldContract} from "@ix/base/composables/Contract/useAstroGoldContract";
import {useSiteHeader} from "@ix/base/composables/useSiteHeader";

useHead({
  title: "Geo Lottery | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})

const globalY = useGlobalWindowScroll()
const router = useRouter()

router.onError((err) => {
  console.log("#ERRRR", err)
})

const { state: isSwapVisible } = useIXTSwapVisible()

const { y } = useWindowScroll()
const { connectWallet, walletState } = useWallet()
const { setupIXTPrice } = useIXTPrice()
const { refreshIXTBalance } = useIXTContract()
const { refreshAstroGoldBalance } = useAstroGoldContract()
const { setActiveCurrency } = useSiteHeader()

const { setRefreshToken } = useLogin()
const { user } = useUser()

watch(y, (pos) => globalY.value = pos)

onMounted(async () => {
  //@ts-ignore
  const isPaintSupported = !!CSS.paintWorklet

  if (isPaintSupported) {
    //@ts-ignore
    CSS.paintWorklet.addModule('/paint/border.js');
  }

  document.body.classList.toggle('is-paint-supported', isPaintSupported)
  document.body.classList.toggle('is-not-paint-supported', !isPaintSupported)

  try {
    const connected = await connectWallet()
    if (connected)
      walletState.value = 'connected'

    if (user.value) {
      setRefreshToken(0)

    }

  } catch (err) {
    console.error("Error mounting app", err)
  }
})

watch(walletState, (state) => {
  if (state != 'connected')
    return

  setupIXTPrice()
  refreshIXTBalance()
  refreshAstroGoldBalance()
  setActiveCurrency('aGold')
}, { immediate: true })

const { x: xpos, y: ypos } = useMouse()

const values = computed(() => {

  const xPos = xpos.value - 38
  const yPos = ypos.value - 60

  return {
    top: `${yPos}px`,
    left: `${xPos}px`
  }
})

</script>

<style>
body,
html {
  background: #000;
}
</style>
