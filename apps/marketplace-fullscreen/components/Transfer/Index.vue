<template lang="pug">
VList(items="center" p="3")
  div(text="2xl black" v-html="$t(`marketplaceFullscreen.transfer.title`)")
  HList(space-x="3")
    Image(w="10" h="10")
    VList()
      div(text="black") Title 
      div(text="black") Planet IX  
    div(flex="grow")
    div(text="black" v-html="$t(`marketplaceFullscreen.transfer.own`)")

div(text="black") Quantity
HelperAdjustable(text="2xl")

//-VList(items="center" space-y="3")
div(text="2xl black") Wallet Adress
Input(text="2xl black center" bg="white" placeholder="e.g Dx0000" border="")
div()
  div(text="black" v-html="$t(`marketplaceFullscreen.transfer.warningText`)")
HList()
  button(m="auto" text="2xl black" bg="gray") 
  div(text="black" v-html="$t(`marketplaceFullscreen.transfer.verifyText`)")

button(m="auto" text="2xl black" bg="gray" p="2") Transfer Item 
</template>

<script lang="ts" setup>
import Image from "~/assets/icons/plus.svg"
</script>