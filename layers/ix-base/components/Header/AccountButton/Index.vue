<template lang="pug">
VList(pos="relative"  ref="menuElement")
  HeaderLink(h="48px" w="166px" b="1 $mc-orange" color="$mc-orange" bg="" px="8" display="lt-md:none" to="/connect" items="center" v-if="walletState !== 'connected'" ) CONNECT WALLET
  Transition(name="fade" appear v-if="walletState == 'connected'")
    HList(h="48px" w="166px" b="1 $mc-mint" color="$mc-mint" bg="$mc-mint-20" px="8"  display="lt-md:none" @click="toggleMenu" items="center") 
      div(grow="~") 
      div() {{ Math.round(ixtBalance * 100) / 100 }} IXT
      div(grow="~") 
  VList(v-if="menuOpen" pos="absolute top-full left-0 right-0" b="1 gray-400" items="left" z="99") 
    HeaderLink(to="")
      div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" style="text-transform: none;" @click="addFunds" color="hover:$mc-orange") {{ $t(`marketplace.navigation.menu.addFunds`)}}
    HeaderLink(group to="")
      div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" style="text-transform: none;" @click="copyAddressToClipboard" color="white group-hover:$mc-orange") {{formatAdress}}
        Copy(w="6" pos="relative" bottom="25px" left="125px" fill="white group-hover:$mc-orange")
    HeaderLink(to="/account")
      div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" style="text-transform: none;" color="white group-hover:$mc-orange" @click="toggleMenu") {{ $t(`marketplace.navigation.menu.account`)}}
    HeaderLink(to="/connect")
      div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" color="hover:$mc-orange" style="text-transform: none;" @click="toggleMenu") {{ $t(`marketplace.navigation.menu.logout`)}}
</template>
    
    
<script lang="ts" setup>
import Copy from '~/assets/images/header/copy.svg'
const { walletAdress, walletState } = useWallet()
const { ixtBalance } = useUserData()
const menuOpen = ref(false)
const menuElement = ref()
const currentAddress = walletAdress.value

const emit = defineEmits(["addFunds"])

const addFunds = () => {
  emit('addFunds')
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const copyAddressToClipboard = async () => {

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

const formatAdress = computed(() => {
  if (!currentAddress) {
    return;
  }
  const firstFour = currentAddress.slice(0, 4);
  const lastFour = currentAddress.slice(-4);
  return `${firstFour}...${lastFour}`;
})

</script>