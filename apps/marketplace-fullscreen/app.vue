<template lang="pug">
#app.antialiased(font="foundry" bg="ix-black" color="white" text="lt-md:sm" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    VList()
      NuxtLoadingIndicator(color="rgb(255, 102, 71)")

      NuxtPage()

      PopupList()

      div#infobox(:style="values" z="400" pos="absolute")

      SnackbarList()


</template>

<script setup lang="ts">
useHead({
  title: "Marketplace | PlanetIX"
})
import 'vue3-easy-data-table/dist/style.css';

const globalY = useGlobalWindowScroll()
const router = useRouter()

router.onError((err) => {
  console.log("#ERRRR", err)
})

const { y } = useWindowScroll()
const { connectWallet, walletState } = useWallet()
const { setupIXTPrice, ixtPrice } = useIXTPrice()

const { setRefreshToken } = useLogin()
const { user } = useUser()

watch(y, (pos) => globalY.value = pos)

onMounted(async () => {
  //@ts-ignore
  const isPaintSupported = !!CSS.paintWorklet

  setupIXTPrice()

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

    if (user.value)
      setRefreshToken(0)

    console.log("price", ixtPrice.value)

  } catch (err) {
    console.error("Error mounting app", err)
  }

})

const { x: xpos, y: ypos } = useMouse()

const values = computed(() => {

  const xPos = xpos.value - 38
  const yPos = ypos.value - 190

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
  --apply: font-foundry;
}
</style>
