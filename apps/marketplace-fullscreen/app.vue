<template lang="pug">
#app.antialiased(font="gridnik" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    NuxtLoadingIndicator(color="rgb(255, 102, 71)")

    NuxtPage()

    PopupList()

    div#infobox(:style="values" z="400" pos="absolute")

    div#takeover

    SnackbarList()

    CookieBot(:id="cookieBotId")

    //- PopupBase(v-if="isSwapVisible" @close="isSwapVisible = false" :disable-default-close="true")
    //-   template(#header) {{ $t(`marketplace.navigation.buy.swap.title`)}}
    //-   template(#default)
    //-     VList(w="full" justify="center" items="center" )
    //-       iframe(src="https://ix.foundation/lefi" w="full" h="full" min-h="118")


  component(is="style").
    :root { 
      --page-header-offset: {{ pageHeaderOffset }}px;
      --filter-header-offset: {{ filterHeaderOffset }}px;
    }

</template>

<script setup lang="ts">
//import { useNeMessages, useNeNotifications } from 'composables/useNeNotificationsAndMessages';

useHead({
  title: "Marketplace | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})

const globalY = useGlobalWindowScroll()
const router = useRouter()
const cookieBotId = "2f5a2e80-772d-413d-9cc6-1edcc72e0de8"

router.onError((err) => {
  console.log("#ERRRR", err)
})

const { state: isSwapVisible } = useIXTSwapVisible()

const { execute: fetchHeaderData } = useHeaderData()
const { execute: fetchMessageData, data: messageData } = useNeMessages()
const { execute: fetchNotificationData, data: notificationData } = useNeNotifications()

const { pageHeaderOffset, filterHeaderOffset } = useStickyOffsets()

await fetchHeaderData()

const { y } = useWindowScroll()
const { connectWallet, walletState } = useWallet()
const { setupIXTPrice } = useIXTPrice()
const { refreshIXTBalance } = useIXTContract()

const { setRefreshToken, isLoggedInAndConnected } = useLogin()
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


watch(isLoggedInAndConnected, (loggedIn) => {
  if (!loggedIn)
    return

  fetchMessageData()
  fetchNotificationData()

  setupIXTPrice()
  refreshIXTBalance()
}, { immediate: true })

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
  background: #0C0C0C;
}

/* Scroll bar stylings */
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #636363;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #636363;
}

.no-scrollbar {
  scrollbar-width: none
}

.no-scrollbar::-webkit-scrollbar,
.no-scrollbar ::-webkit-scrollbar {
  display: none
}

.no-scrollbar::-webkit-scrollbar-thumb,
.no-scrollbar ::-webkit-scrollbar-thumb {
  display: none
}

.no-scroll {
  overflow: hidden;
}
</style>
