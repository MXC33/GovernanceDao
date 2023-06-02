<template lang="pug">
VList(pos="relative"  ref="menuElement")
  HeaderLink(h="48px" w="166px" b="1 $mc-orange" color="$mc-orange" bg="" px="8" display="lt-md:none" to="/connect" items="center" v-if="walletState !== 'connected'" ) CONNECT WALLET
  Transition(name="fade" appear v-if="walletState == 'connected'")
    HList(h="48px" w="166px" b="1 $mc-mint" color="$mc-mint" bg="$mc-mint-20" px="8"  display="lt-md:none" @click="toggleMenu" items="center") 
      div(grow="~") 
      div() {{ Math.round(ixtBalance * 100) / 100 }} IXT
      div(grow="~") 
  VList(v-if="menuOpen" pos="absolute top-full left-0 right-0" b="1 gray-400" items="left" z="99") 
    HeaderLink(to="/")
      div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" style="text-transform: none;" @click="addFunds" color="hover:$mc-orange") Add funds
    HeaderLink(group to="/")
      div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" style="text-transform: none;" @click="copyAddressToClipboard" color="white group-hover:$mc-orange") 0x4ac...89fc 
        Copy(w="6" pos="relative" bottom="25px" left="125px" fill="white group-hover:$mc-orange")
    HeaderLink(to="/")
      div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" style="text-transform: none;" @click="toggleMenuButton3" color="gray-400") Account
    HeaderLink(to="/connect")
      div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" color="hover:$mc-orange" style="text-transform: none;" @click="toggleMenu") Log out
</template>
    
    
<script lang="ts" setup>
import Copy from '~/assets/images/header/copy.svg'
const { walletAdress, walletState } = useWallet()
const { ixtBalance } = useUserData()
const menuOpen = ref(false)
const menuButton1 = ref(false)
const menuElement = ref()

defineProps<{
  buttonText?: string
  ButtonLink?: string
}>()

const emit = defineEmits(["addFunds"])

const addFunds = () => {
  toggleMenu()
  emit('addFunds')
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const toggleMenuButton1 = () => {
  menuButton1.value = !menuButton1.value
}
const toggleMenuButton3 = () => {
  menuButton1.value = !menuButton1.value
  console.log('Coming Soon!')
  console.log(walletAdress.value)
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
  menuOpen.value = false;
})


</script>