<template lang="pug">
VList(pos="relative" ref="menuElement" frame="~ gray-400 hover:gray-300"  min-w="on-connected:25" items="center" :connected="isLoggedInAndConnected" transitino="all")
  HList(flex-grow="1" w="full")

    button(p="2" @click="toggleMenu" whitespace="nowrap" flex-grow="1" text="center" flex="~ row" justify="center")
      Transition(name="fade-slow" mode="out-in")
        span(v-if="walletState == 'disconnected'") {{ $t(`general.navigation.menu.connectWallet`)}}

        span(v-else-if="ixtBalance != undefined && isLoggedInAndConnected" w="25" text="ix-mint") {{ roundToDecimals(ixtBalance, 2) }} IXT

        HelperLoader(v-else fill="ix-mint on-wallet:ix-orange" w="4" :wallet="walletState != 'connected'")

    button(v-if="ixtBalance != undefined && isLoggedInAndConnected" bg="hover:gray-600 gray-700" @click="showIXTSwap" flex="~ row" display="lt-md:none" justify="center" items="center" aspect="square" wh="10")
      PlusIcon(wh="4" fill="white")
  //-HeaderAccountButtonNumber(:state="walletState" :balance="ixtBalance")

  Transition(name="slide-top")
    HeaderSubmenuWrapper(v-if="menuOpen" :align-right="true")
      VList(b="gray-400" divide-y="1")
        slot(name="dropdown")
        //-HeaderSubmenuButton(@click="showIXTSwap") {{ $t(`general.navigation.menu.addFunds`)}}

        //-NuxtLink(to="/account")
          HeaderSubmenuButton(b="t-1 b-1 gray-400") {{ $t(`general.navigation.menu.account`)}}

        HeaderSubmenuButton(v-if="ixtBalance != undefined" b="gray-400")
          HList(space-x="1" items="center")
            div(font="bold") ADD IXT

        NuxtLink(to="/connect" @click="toggleMenu" b="gray-400")
          HeaderSubmenuButton() {{ $t(`general.navigation.menu.logout`)}}

</template>

<script lang="ts" setup>
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";
//SVG
import PlusIcon from "~/assets/images/icons/plus.svg";

const { walletState } = useWallet()
const menuOpen = ref(false)
const menuElement = ref()
const { enable: showIXTSwap } = useIXTSwapVisible()
const route = useRoute()
const { ixtBalance } = useIXTContract()
const { isLoggedInAndConnected } = useLogin()
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
