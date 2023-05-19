<template lang="pug">
div(v-if="amountSelected != 0" w="full" p="3" pos="sticky bottom-0" z="2" bg="ix-black")
  HList(space-x="3" items="center")
    HList(font="bold" text="md" space-x="3")
      div(text="white" capitalize="~" ) {{amountSelected}} Items selected 
      button(text="red" capitalize="~" ) clear all

    //- To Create space between the text on the left side an the buttons on the right 
    div(flex="grow")
    
    ButtonSound(sound="sm" btn="~ primary" cut="bottom-right") Bid {{amountSelected}} Items
    ButtonSound(sound="sm" btn="~ primary" cut="bottom-right") Add {{amountSelected}} To Cart 
</template>

<script lang="ts" setup>
defineProps({
  amountSelected: Number
})
</script>