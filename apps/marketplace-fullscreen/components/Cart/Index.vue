<template lang="pug">
Transition(name="fade")
  div(pos="fixed" inset="0" z="199" v-if="viewingCart" bg="ix-black opacity-80" @click="viewingCart = false")

Transition(name="slide-right")
  div(pos="fixed right-0 top-0 bottom-0" overflow-y="auto" bg="ix-black" w="80 md:120" max-w="80%" z="200" color="white" space-y="5" py="6" ref="cartElement" v-if="viewingCart")
    header(pos="sticky top-0" px="6" space-y="3")
      h3(text="xl" font="bold") My Cart

      div(b="b-0.5 gray-600" mx="-6")

      HList()
        h4(font="bold" text="md") {{ cartItems.length }} items

    CartItem(v-model="cartItems[index]" v-for="(item, index) in cartItems")
    
  </template>
  
  
<script lang="ts" setup>
const cartElement = ref()

onClickOutside(cartElement, () => viewingCart.value = false)

const { viewingCart, cartItems } = useCart()

</script>
  