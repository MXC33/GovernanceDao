<template lang="pug">
footer(pos="sticky bottom-0" bg="ix-black")
  HList(items="center" text="xl" p="3")
    h3(text="gray-200" flex-grow="1") Total price
    div(font="bold") {{ totalPrice }} IXT

  ButtonInteractive(btn="~ primary" opacity="on-load:50" w="full" font="bold" @click="checkout" :loading="isLoading" transition="all" text="Complete Purchase")
</template>


<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart';

const { displayPopup } = usePopups()
const { viewingCart, cartItems, checkoutItems } = useCart()

const { loading: isLoading, execute: buyItems } = useContractRequest(() => checkoutItems(cartItems.value, totalPrice.value), {
  title: "Purchase error"
})

const onPurchase = (items: CartItem[]) => {
  displayPopup({
    type: 'buy-items-success',
    items
  })

  viewingCart.value = false
  cartItems.value = []
}

const checkout = async () => {
  const checkout = await buyItems()
  console.log("cartItems.value", cartItems.value)
  console.log("checkout", checkout)

  if (checkout)
    onPurchase(cartItems.value)

}

const totalPrice = computed(() =>
  roundToDecimals(cartItems.value.map((item) =>
    item.shares.value * item.ixtPrice
  ).reduce((a, b) => a + b, 0), 2)
)
</script>
