<template lang="pug">
VList(pos="relative"  ref="menuElement")
  HeaderLink(h="48px" w="166px" b="1 $mc-orange" color="$mc-orange" bg="" px="8" display="lt-md:none" to="/connect" items="center" v-if="walletState !== 'connected'" ) CONNECT WALLET
  Transition(name="fade" appear v-if="walletState == 'connected'")
    HList(h="48px" w="166px" b="1 $mc-mint" color="$mc-mint" bg="$mc-mint-20" px="8"  display="lt-md:none" @click="toggleMenu" items="center") 
      div(grow="~") 
      div() {{ Math.round(ixtBalance * 100) / 100 }} IXT
      div(grow="~") 
  VList(v-if="menuOpen" pos="absolute top-full left-0 right-0" b="1 gray-400" items="left" z="99") 
    HeaderAccountButtonItem(v-for="index in arr", :displayText="index" :icon="true" :link="linkTest" :clicked="clickedIt")
</template>
    
    
<script lang="ts" setup>
const { walletAdress, walletState } = useWallet()
const { ixtBalance } = useUserData()
const menuOpen = ref(false)
const menuButton1 = ref(false)
const menuElement = ref()

const arr = ["Add funds", "0x4ac...89fc", "Account", "Log out"]
const linkTest = "/account"
const clickedIt = "copyAddressToClipboard"

const emit = defineEmits(["addFunds"])

const addFunds = () => {
  toggleMenu()
  emit('addFunds')
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  console.log(clickedIt)
}

const toggleMenuButton1 = () => {
  menuButton1.value = !menuButton1.value
}

const copyAddressToClipboard = async () => {
  const currentAddress = walletAdress.value;
  console.log('I am copying!')

  try {
    if (!currentAddress)
      return
    await navigator.clipboard.writeText(currentAddress.toString())
  } catch (error) {
    console.error('Failed to copy Adress to clipboard:', error)
  }
}

onClickOutside(menuElement, () => {
  //menuOpen.value = false;
})


</script>