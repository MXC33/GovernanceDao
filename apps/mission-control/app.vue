<template lang="pug">
#app.antialiased(font="apercu" bg="mc-black" text="sm lt-md:base" ref="app" color="white" pos="absolute" inset="0" min-h="0" overscroll="none" overflow="hidden" flex="~ col grow")
  PlaycanvasGame()

  NuxtLayout()
    NuxtLoadingIndicator(color="#84D4BC")
    NuxtPage()

  Overlays()

  PreBundleUno

  CookieBot(:id="cookieBotId")

</template>

<script setup lang="ts">
import * as pc from 'playcanvas';

const app = ref()
const route = useRoute()
const { markAllNotificationsRead } = useNotifications()
const gameMenu = useGameMenu()
const { provider } = useWallet()
const { activeSpeedupOrder } = useCorporationOrders()
const menuOpen = useSiteMenuOpen()
const cookieBotId = "2f5a2e80-772d-413d-9cc6-1edcc72e0de8"
const { connectWallet, walletState } = useWallet()
const { setupTimerListener } = useGlobalTimestamp()

const { loginStatus } = useLogin()

const { execute: fetchHeaderData } = useHeaderData()
const { execute: fetchMessageData } = useNeMessages()
const { execute: fetchNotificationData } = useNeNotifications()

const { setupMerkleMintContract } = useMerkleMintContract()
const { setupGravityGradeContract } = useBuyPacks()
const { setupTetherContract, setupOracleManagerContract, setupPixTokenContract, setupMaxCoinContract, setupUSDTManagerContract, setupUSDCManagerContract, setupWrappedEthContract } = usePayment()
const { setupStakingContract } = useStakeNFTContracts()
const { setupOldStakingContract } = useClaimAndUnstakeAll()

await fetchHeaderData()

onBeforeMount(() => {
  setupTimerListener()
})

watch(loginStatus, (state) => {
  if (state != 'logged-in')
    return

  fetchMessageData()
  fetchNotificationData()
}, { immediate: true })

// Reset states on route change
watch(route, () => {
  resetPageStates()

  if (process.client)
    toggleFixedHeight()
})
const resetPageStates = () => {
  markAllNotificationsRead()

  menuOpen.value = false

  const expectSpeedupOrder = gameMenu.value == 'task-manager' && activeSpeedupOrder.value != null

  if (!expectSpeedupOrder) {
    gameMenu.value = null
  }
}
const toggleFixedHeight = () => {
  const route = useRoute()
  const isTerminal = route.name.toString().includes("terminal")
  const isFixed = !isTerminal
  document.body.classList.toggle('is-fixed-height', isFixed)
}
onMounted(async () => {

  toggleFixedHeight()

  //@ts-ignore
  const isPaintSupported = !!CSS.paintWorklet

  if (isPaintSupported) {
    //@ts-ignore
    CSS.paintWorklet.addModule('/paint/border.js');
  }
  document.body.classList.toggle('is-paint-supported', isPaintSupported)
  document.body.classList.toggle('is-not-paint-supported', !isPaintSupported)

  const connected = await connectWallet()
  if (connected)
    walletState.value = 'connected'

})

if (process.client) {
  (window as any).pc = pc
}

const { setupAllContracts, allContracts } = useDefinedContractSetups()

watch(provider, (provider) => {
  if (!provider)
    return


  // Set up all 
  setupAllContracts(provider)

  // Contracts that haven't been moved to defineContract
  setupMerkleMintContract(provider)
  setupTetherContract(provider)
  setupOracleManagerContract(provider)
  setupGravityGradeContract(provider)
  setupPixTokenContract(provider)
  setupMaxCoinContract(provider)
  setupUSDTManagerContract(provider)
  setupStakingContract(provider)
  setupOldStakingContract(provider) // remove after v2 is fully live.
  setupUSDCManagerContract(provider)
  setupWrappedEthContract(provider)

})

useHead({
  title: "Mission Control",
  meta: [
    {
      name: "X-UA-Compatible",
      content: "IE=Edge"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes"
    }
  ],

  link: [
    { rel: "icon", href: "/IX-icon.png" }
  ]
});

</script>


<style>
.glow-mint {
  filter: drop-shadow(0px 0px 6px #84D4BC);
}


.glow-orange {
  filter: drop-shadow(0px 0px 6px rgba(255, 102, 71, 0.5));
}


.carousel__viewport,
.carousel__track {
  flex-grow: 1;
  height: 100%;
}
</style>

<style>
body {
  background: var(--mc-black);
  font-variant-ligatures: no-common-ligatures;

}

body.is-fixed-height {
  overflow: hidden;
  height: 100%;
}

.no-scrollbar {
  scrollbar-width: none
}

.no-scrollbar::-webkit-scrollbar {
  display: none
}
</style>