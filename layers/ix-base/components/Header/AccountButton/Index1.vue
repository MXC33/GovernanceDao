<template lang="pug">
VList(pos="relative"  ref="menuElement")
  HeaderLink(h="48px" w="166px" b="1 $mc-orange" color="$mc-orange" bg="" px="8" display="lt-md:none" to="/connect" items="center" v-if="walletState !== 'connected'" ) CONNECT WALLET
  Transition(name="fade" appear v-if="walletState == 'connected'")
    HList(h="48px" w="166px" b="1 $mc-mint" color="$mc-mint" bg="$mc-mint-20" px="8"  display="lt-md:none" @click="toggleMenu" items="center") 
      div(grow="~") 
      div() {{ Math.round(ixtBalance * 100) / 100 }} IXT
      div(grow="~") 
  VList(v-if="menuOpen" pos="absolute top-full left-0 right-0" b="1 gray-400" items="left" z="99") 
    HeaderAccountButtonItem(v-for="index in arr", :displayText="index" :svgname="iconYes" :link="linkTest" @addFunds="$emit('addFunds')" @close="toggleMenu")
</template>
    
    
<script lang="ts" setup>
const { walletState } = useWallet()
const { ixtBalance } = useUserData()
const menuOpen = ref(false)
const menuElement = ref()

const arr = ["Add funds", "0x4ac...89fc", "Account", "Log out"]
const linkTest = "/account"
const iconYes = "copy"


const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onClickOutside(menuElement, () => {
  menuOpen.value = false;
})


</script>