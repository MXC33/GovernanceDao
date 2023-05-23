<template lang="pug">
Transition(name="fade")
  div(pos="fixed" inset="0" z="199" v-if="viewingCart" bg="ix-black opacity-80" @click="viewingCart = false")

Transition(name="slide-right")
  VList(pos="fixed right-0 top-0 bottom-0" overflow-y="auto" bg="ix-black" w="80 md:120" max-w="80%" z="200" color="white" ref="cartElement" v-if="viewingCart")
    header(pos="sticky top-0" px="6" space-y="3" bg="black" p="t-6 b-3" z="1")
      h3(text="xl" font="bold") My Cart

      div(b="b-0.5 gray-600" mx="-6")

      HList()
        h4(font="bold" text="md") {{ cartItems.length }} items

    VList(flex-grow="1" space-y="3")
      template(v-for="(item, index) in cartItems" :key="getTokenKey(item.token)")
        CartItem(v-model="cartItems[index]")

      div(flex-grow="1")

    footer(pos="sticky bottom-0" bg="ix-black")
      HList(items="center" text="xl" p="3") 
        h3(text="gray-200" flex-grow="1") Total price
        div(font="bold") {{ totalPrice }} IXT

      button(btn="~ primary" w="full" font="bold") Complete purchase
    
  </template>
  
  
<script lang="ts" setup>
const cartElement = ref()
const { getTokenKey } = useTokens()
onClickOutside(cartElement, () => viewingCart.value = false)
const { viewingCart, cartItems } = useCart()

const totalPrice = computed(() =>
  roundToDecimals(cartItems.value.map((item) =>
    item.value * (item.sale?.price ?? 0)
  ).reduce((a, b) => a + b, 0), 2)
)
</script>
  