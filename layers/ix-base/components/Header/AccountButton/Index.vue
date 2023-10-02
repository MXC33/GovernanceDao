<template lang="pug">
VList(pos="relative" display="lt-md:none" ref="menuElement" frame="~ gray-400 hover:gray-300")
  HList()

    button(p="2" @click="toggleMenu" whitespace="nowrap")
      Transition(name="fade-slow" mode="out-in")
        span(v-if="walletState == 'disconnected'") {{ $t(`general.navigation.menu.connectWallet`)}}

        span(v-else-if="ixtBalance != undefined" w="25" text="ix-mint") {{ roundToDecimals(ixtBalance, 2) }} IXT

        HelperLoader(v-else fill="ix-mint on-wallet:ix-orange" w="4" :wallet="walletState != 'connected'")

    button(v-if="ixtBalance != undefined" bg="hover:gray-600 gray-700" @click="showIXTSwap" flex="~ row" justify="center" items="center" aspect="square" wh="10")
      PlusIcon(wh="4" fill="white")
  //-HeaderAccountButtonNumber(:state="walletState" :balance="ixtBalance")

  HeaderSubmenuWrapper(v-if="menuOpen" :align-right="true")
    VList(b="gray-400")
      slot(name="dropdown")
      //-HeaderSubmenuButton(@click="showIXTSwap") {{ $t(`general.navigation.menu.addFunds`)}}

      //-NuxtLink(to="/account")
        HeaderSubmenuButton(b="t-1 b-1 gray-400") {{ $t(`general.navigation.menu.account`)}}

      NuxtLink(to="/connect" @click="toggleMenu")
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
const { ixtBalance, ixtPending } = useIXTContract()
watch([ixtBalance, ixtPending], () => {
  console.log("BALANCE", ixtBalance.value, ixtPending.value)
})

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
