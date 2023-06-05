<template lang="pug">
VList(display="md:none" pos="fixed" inset="0" bg="black" overflow-y="auto" m="!l-0")
  HList(items="center"  bg="gray-800" px="4 md:7.5" h="16")
    NuxtLink(to="https://www.planetix.com")
      PlanetIXNew(w="42.25")  
    div(grow="~")
    HelperLanguage(language="EN")
    CrossIcon(pos="right" w="8" display="md:none" @click="$emit('close')")
  HeaderCategoryDropDownAccount(@swap="Swap" @ConnectWallet="ConnectWallet")
  HeaderCategoryDropDownGrid()
  HeaderButtonDisconnect(@disconnect="$emit('disconnect')" pos="sticky bottom-0" z="1")

</template>

<script lang="ts" setup>
import CrossIcon from '~/assets/images/header/cross.svg'
import PlanetIXNew from '~/assets/images/header/planetix-new.svg'
const emit = defineEmits(['swap', 'ConnectWallet', 'close'])

const ConnectWallet = () =>{
  console.log("index Connect Wallet");
  emit('ConnectWallet')
}

const Swap = () =>{
  console.log("index Swap");
  emit('swap')
}

</script>