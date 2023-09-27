<template lang="pug">
Transition(name="fade")
  div(pos="fixed" inset="0" z="199" v-if="viewingCart" bg="ix-black opacity-80" @click.stop="viewingCart = false")

Transition(name="slide-right")
  VList(pos="fixed right-0 top-0 bottom-0" overflow-y="auto" bg="ix-black" w="full md:120" max-w="md:80%" z="200" color="white" ref="cartElement" v-if="viewingCart")
    header(pos="sticky top-0" px="6" space-y="3" bg="black" p="t-3 b-3 md:t-6 b-3" z="3")
      HList(items="center" justify="between")
        h3(text="xl" font="bold") {{ $t(`marketplace.cart.title`) }}
        CloseIcon(w="4" @click.stop="viewingCart = false" cursor="pointer" fill="white hover:opacity-80")

      div(b="b-0.5 gray-600" mx="-6")

      HList(items="center" justify="between")
        h4(font="bold" text="md") {{ cartItems.length }} {{ $t(`marketplace.cart.items`) }}
        button(font="bold" text="md" color="ix-ne on-empty:!gray-200" :disabled="isCartEmpty" @click="onClearCart" :empty="isCartEmpty") {{ $t(`marketplace.cart.clearAll`) }}

    VList(flex-grow="1" space-y="3")
      TransitionGroup(name="cart")
        template(v-for="(item, index) in cartItems" :key="getTokenKey(item.token)")
          CartItem(v-model="cartItems[index]")

      div(flex-grow="1")

    CartCheckout()

</template>
  
  
<script lang="ts" setup>
import CloseIcon from '~/assets/icons/close.svg'

const cartElement = ref()
const { viewingCart, cartItems, clearCart } = useCart()


const onClearCart = () => {
  clearCart()
}

const isCartEmpty = computed(() => {
  if (cartItems.value.length < 1)
    return true
  return false
})


</script>

<style>
.cart-move,
.cart-enter-active,
.cart-leave-active {
  transition: all 300ms ease;
}

.cart-enter-from,
.cart-leave-to {
  opacity: 0;
  transform: translateX(1rem);
}

.cart-leave-active {
  transition: all 300ms ease;
}
</style>