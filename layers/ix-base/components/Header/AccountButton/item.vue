<template lang="pug">
HeaderLink(group :to="link")
  div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" color="group-hover:$mc-orange" style="text-transform: none;" @click="OnClicked(displayText)" ) {{ displayText }}
    Icon( w="6" pos="relative" bottom="25px" left="125px" fill="white group-hover:$mc-orange")
</template>


<script lang="ts" setup>
const { walletAdress } = useWallet()

const {displayText, link, svgname} = defineProps<{
  displayText: string,
  link?: string,
  svgname?: string
}>()

const emit = defineEmits(["addFunds", "close"])


const OnClicked = (displayText: string ) =>{
  console.log("OnClicked has been clicked", displayText)

  if (displayText == 'copyAddressToClipboard'){
    copyAddressToClipboard()
  }
  if (displayText == 'Add funds'){
    emit('addFunds')
  }
  if (displayText == 'Account'){
    emit('close')
  }
  if (displayText == 'Log out'){
    emit('close')
  }
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
//----------------------
import FallbackVue from '~/components/Fallback.vue';

const Icon = await import(`../../../assets/images/header/${svgname}.svg`).catch(() => FallbackVue)
//----------------------

//- HeaderLink(to="/")
    //-   div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" style="text-transform: none;" @click="addFunds" color="hover:$mc-orange") Add funds
    //- HeaderLink(group to="/")
    //-   div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" style="text-transform: none;" @click="copyAddressToClipboard" color="white group-hover:$mc-orange") 0x4ac...89fc 
    //-     Copy(w="6" pos="relative" bottom="25px" left="125px" fill="white group-hover:$mc-orange")
    //- HeaderLink(to="/")
    //-   div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" style="text-transform: none;" @click="toggleMenuButton3" color="gray-400") Account
    //- HeaderLink(to="/connect")
    //-   div(h="10" p="3" bg="black" b="b-1 gray-600" text="left" color="hover:$mc-orange" style="text-transform: none;" @click="toggleMenu") Log out




</script>

