<template lang="pug">
#app.antialiased(font="foundry" bg="ix-black" color="white" text="sm lg:md" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    NuxtLoadingIndicator(color="rgb(255, 102, 71)")

    NuxtPage()

    div#popups()

    div#infobox(:style="values" z="400" pos="absolute")

    Transition(name="fade-slow" mode="in-out")
      HelperNotification(v-if="activeNotification" :type="activeNotification")

</template>

<script setup lang="ts">
import 'vue3-easy-data-table/dist/style.css';

const globalY = useGlobalWindowScroll()
const { y } = useWindowScroll()
const { connectWallet, walletState } = useWallet()
const { setupIXTPrice, ixtPrice } = useIXTPrice()
const { activeNotification } = useNotifications()


watch(y, (pos) => globalY.value = pos)



onMounted(async () => {
  const connected = await connectWallet()
  if (connected)
    walletState.value = 'connected'

  await setupIXTPrice()

  console.log("price", ixtPrice.value)

  //@ts-ignore
  const isPaintSupported = !!CSS.paintWorklet

  if (isPaintSupported) {
    //@ts-ignore
    CSS.paintWorklet.addModule('/paint/border.js');
  }

  document.body.classList.toggle('is-paint-supported', isPaintSupported)
  document.body.classList.toggle('is-not-paint-supported', !isPaintSupported)
})

const { x: xpos, y: ypos } = useMouse()

const values = computed(() => {

  const xPos = xpos.value - 40
  const yPos = ypos.value - 180

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