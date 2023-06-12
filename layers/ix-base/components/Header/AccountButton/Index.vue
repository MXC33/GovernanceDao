<template lang="pug">
VList(pos="relative" display="lt-md:none"  ref="menuElement")
  button(btn-soft="s-connected:ix-mint ix-orange" @click="toggleMenu" :state="walletState") 
    Transition(name="fade-slow" mode="out-in")
      div(v-if="walletState == 'disconnected'") Connect Wallet
      div(v-else-if="!ixtPending && walletState == 'connected'") {{ roundToDecimals(ixtBalance ?? 0, 2) }} IXT
      HelperLoader(v-else fill="ix-mint on-wallet:ix-orange" w="4" :wallet="walletState != 'connected'")

  VList(v-if="menuOpen" pos="absolute top-full left-0 right-0" b="1 gray-400" items="left" z="99") 
    HeaderLink(to="")
      div(v-bind="commonAttrs" @click="addFunds") {{ $t(`marketplace.navigation.menu.addFunds`)}}

    HeaderLink(to="/account")
      div(v-bind="commonAttrs" @click="toggleMenu") {{ $t(`marketplace.navigation.menu.account`)}}

    HeaderLink(to="/connect")
      div(v-bind="commonAttrs" @click="toggleMenu") {{ $t(`marketplace.navigation.menu.logout`)}}

</template>
    
    
<script lang="ts" setup>
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";

const { walletState } = useWallet()
const { ixtBalance, fetchIXT, ixtPending } = useIXTContract()
const menuOpen = ref(false)
const menuElement = ref()
const emit = defineEmits(["addFunds"])

const addFunds = () => {
  emit('addFunds')
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}


onClickOutside(menuElement, () => {
  menuOpen.value = false;
})

const commonAttrs = {
  h: "10",
  p: "3",
  bg: "black",
  b: "b-1 gray-600",
  text: "left",
  style: "text-transform: none;",
  color: "white group-hover:$mc-orange"
};

</script>