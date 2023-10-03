<template lang="pug">
VList(pos="relative" ref="menuElement" frame="~ gray-400 hover:gray-300"  items="center" :connected="isAccountActive" transitino="all")
  HList(flex-grow="1" w="full")

    button(p="2" @click="toggleMenu" whitespace="nowrap" flex-grow="1" text="center" flex="~ row" justify="center" items="center")
      Transition(name="fade-slow" mode="out-in")
        span(v-if="walletState == 'disconnected'") {{ $t(`general.navigation.menu.connectWallet`)}}

        span(v-else-if="isAccountActive && ixtBalance != undefined" w="25" text="$header-mint") {{ roundToDecimals(ixtBalance, 2) }} IXT

        HelperLoader(v-else fill="$header-mint on-wallet:$header-orange" w="4" :wallet="walletState != 'connected'")

    button(v-if="isAccountActive" bg="hover:gray-600 gray-700" @click="showIXTSwap" flex="~ row" display="lt-md:none" justify="center" items="center" aspect="square" wh="10")
      PlusIcon(wh="4" fill="white")
  //-HeaderAccountButtonNumber(:state="walletState" :balance="ixtBalance")

  Transition(name="slide-top")
    HeaderAccountButtonMenu(v-if="menuOpen" ref="menuElement" @click="menuOpen = false")

</template>

<script lang="ts" setup>
import PlusIcon from "~/assets/images/icons/plus.svg";

const { walletState } = useWallet()
const menuOpen = ref(false)
const menuElement = ref()
const { enable: showIXTSwap } = useIXTSwapVisible()
const route = useRoute()
const { ixtBalance } = useCurrencyData()
const { isLoggedInAndConnected } = useLogin()

const isAccountActive = computed(() =>
  ixtBalance.value != undefined && isLoggedInAndConnected.value
)

const toggleMenu = () => {
  if (walletState.value !== 'connected') {
    const toRoute = route.path !== '/connect' ? route.path : '/'
    navigateTo({
      path: '/connect',
      query: {
        origin: encodeURIComponent(toRoute)
      }
    })
    return
  }

  menuOpen.value = !menuOpen.value
}


onClickOutside(menuElement, () => {
  menuOpen.value = false;
})

</script>
