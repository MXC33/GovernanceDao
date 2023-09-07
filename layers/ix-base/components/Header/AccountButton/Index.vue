<template lang="pug">
VList(pos="relative" display="lt-md:none"  ref="menuElement")
  button(btn-soft="s-connected:ix-mint ix-orange" @click="toggleMenu" :state="walletState")
    Transition(name="fade-slow" mode="out-in")
      span(v-if="walletState == 'disconnected'") {{ $t(`marketplace.navigation.menu.connectWallet`)}}
      span(v-else-if="!ixtPending && ixtBalance != undefined && walletState == 'connected'" w="25") {{ roundToDecimals(ixtBalance, 2) }} IXT
      HelperLoader(v-else fill="ix-mint on-wallet:ix-orange" w="4" :wallet="walletState != 'connected'")

  HeaderSubmenuWrapper(v-if="menuOpen" :align-right="true")

    VList(b="gray-400")
      HeaderSubmenuButton(@click="showIXTSwap") {{ $t(`marketplace.navigation.menu.addFunds`)}}

      NuxtLink(to="/account")
        HeaderSubmenuButton(b="t-1 b-1 gray-400") {{ $t(`marketplace.navigation.menu.account`)}}

      NuxtLink(to="/connect" @click="toggleMenu")
        HeaderSubmenuButton() {{ $t(`marketplace.navigation.menu.logout`)}}

</template>

<script lang="ts" setup>
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";

const { walletState } = useWallet()
const { ixtBalance, ixtPending } = useIXTContract()
const menuOpen = ref(false)
const menuElement = ref()
const { enable: showIXTSwap } = useIXTSwapVisible()
const route = useRoute()

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
