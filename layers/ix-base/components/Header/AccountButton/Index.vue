<template lang="pug">
VList(pos="relative"  ref="menuElement")
  HeaderLink(h="48px" w="166px" b="1 $mc-orange" bg="$mc-orange_20" display="lt-md:none" to="/connect" items="center" v-if="walletState !== 'connected'" text="$mc-orange")
    div(text="center xs" p="" font="" color="$mc-orange" ) CONNECT WALLET
  Transition(name="fade-slow" appear v-if="walletState == 'connected'")
    HList(h="48px" w="166px" b="1 $mc-mint" color="$mc-mint" bg="$mc-mint-20" px="8"  display="lt-md:none" @click="toggleMenu" items="center") 
      div(grow="~") 
      div() {{ Math.round(ixtBalance ?? 0 * 100) / 100 }} IXT
      div(grow="~") 
  VList(v-if="menuOpen" pos="absolute top-full left-0 right-0" b="1 gray-400" items="left" z="99") 
    HeaderLink(to="")
      div(v-bind="commonAttrs" @click="addFunds") {{ $t(`marketplace.navigation.menu.addFunds`)}}
    HeaderLink(group to="")
      div(v-bind="commonAttrs" @click="copyAddressToClipboard") {{(formatAdress ?? "0x4ac...89fc")}}
        Copy(w="6" pos="relative" bottom="25px" left="125px" fill="white group-hover:$mc-orange")
    HeaderLink(to="/account")
      div(v-bind="commonAttrs" @click="toggleMenu") {{ $t(`marketplace.navigation.menu.account`)}}
    HeaderLink(to="/connect")
      div(v-bind="commonAttrs" @click="toggleMenu") {{ $t(`marketplace.navigation.menu.logout`)}}
</template>
    
    
<script lang="ts" setup>
import Copy from '~/assets/images/header/copy.svg'
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";
const { walletAdress, walletState } = useWallet()
const { ixtBalance, fetchIXT } = useIXTContract()
const menuOpen = ref(false)
const menuElement = ref()
const currentAdress = walletAdress.value
const emit = defineEmits(["addFunds"])

await fetchIXT()

const addFunds = () => {
  emit('addFunds')
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const copyAddressToClipboard = async () => {

  try {
    if (!currentAdress)
      return
    await navigator.clipboard.writeText(currentAdress.toString())
  } catch (error) {
    console.error('Failed to copy Adress to clipboard:', error)
  }
}

onClickOutside(menuElement, () => {
  menuOpen.value = false;
})

const formatAdress = computed(() => {
  if (!currentAdress) {
    return;
  }
  const firstFour = currentAdress.slice(0, 4);
  const lastFour = currentAdress.slice(-4);
  return `${firstFour}...${lastFour}`;
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