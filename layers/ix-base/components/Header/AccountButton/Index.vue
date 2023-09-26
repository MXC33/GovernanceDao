<template lang="pug">
VList(pos="relative" display="lt-md:none" ref="menuElement" frame="~")
  HList(w="30")
    button(p="2" @click="toggleMenu")
      Transition(name="fade-slow" mode="out-in")
        span(v-if="walletState == 'disconnected'") {{ $t(`general.navigation.menu.connectWallet`)}}
        span(v-else-if="ixtBalance != undefined" w="25" text="ix-mint") {{ roundToDecimals(ixtBalance, 2) }} IXT
        HelperLoader(v-else fill="ix-mint on-wallet:ix-orange" w="4" :wallet="walletState != 'connected'")

    button(v-if="ixtBalance != undefined" bg="gray-700" @click="showIXTSwap" grow="~" flex="~ row" items="center")
      div(grow="~")
      plusIcon(wh="6" p="1" fill="white")
      div(grow="~")

  HeaderSubmenuWrapper(v-if="menuOpen" :align-right="true")

    VList(b="gray-400")
      HeaderSubmenuButton(@click="showIXTSwap") {{ $t(`general.navigation.menu.addFunds`)}}

      NuxtLink(to="/account")
        HeaderSubmenuButton(b="t-1 b-1 gray-400") {{ $t(`general.navigation.menu.account`)}}

      NuxtLink(to="/connect" @click="toggleMenu")
        HeaderSubmenuButton() {{ $t(`general.navigation.menu.logout`)}}

</template>

<script lang="ts" setup>
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";
import { useAstroGoldContract } from "@ix/base/composables/Contract/useAstroGoldContract";
import { useSiteHeader } from "@ix/base/composables/useSiteHeader";

//SVG
import plusIcon from "~/assets/images/icons/plus.svg";

const { walletState } = useWallet()
const menuOpen = ref(false)
const menuElement = ref()
const { enable: showIXTSwap } = useIXTSwapVisible()
const route = useRoute()


//const { activeCurrency } = useSiteHeader()
const { ixtBalance, ixtPending } = useIXTContract()
//const { astroGoldBalance, astroGoldPending } = useAstroGoldContract()

const isWalletConnected = !ixtPending && walletState.value == 'connected'

const toggleMenu = () => {
  if (walletState.value !== 'connected') {
    const toRoute = route.path !== '/connect' ? route.path : '/'
    navigateTo({
      path: '/connect',
      query: {
        redirectUrl: encodeURIComponent(toRoute)
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
