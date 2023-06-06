<template lang="pug">
VList(pos="relative"  ref="menuElement")
  HeaderLink(h="12" w="42" b="1 $mc-orange" bg="$mc-orange_20" display="lt-md:none" to="/connect" items="center" v-if="walletState !== 'connected'" text="$mc-orange")
    div(text="center xs" p="" font="" color="$mc-orange" ) CONNECT WALLET

  Transition(name="fade-slow" appear v-if="walletState == 'connected'")
    VList(w="42" b="1 $mc-mint" color="$mc-mint" bg="$mc-mint-20 hover:$mc-mint-40" px="8" py="2" display="lt-md:none" @click="toggleMenu" items="center" cursor="pointer")
      span() {{ Math.round((ixtBalance ?? 0) * 100) / 100 }} IXT

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
const { ixtBalance, fetchIXT } = useIXTContract()
const menuOpen = ref(false)
const menuElement = ref()
const emit = defineEmits(["addFunds"])

await fetchIXT()

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