<template lang="pug">
footer(pos="sticky bottom-0" bg="ix-black")
  HList(items="center" text="xl" p="3")
    h3(text="gray-200" flex-grow="1") Total price
    div(font="bold") {{ totalPrice }} IXT

  button(btn="~ primary" opacity="on-load:50" w="full" font="bold" @click="checkout" :load="isLoading" transition="all") Complete purchase
</template>


<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart';

const { displayPopup } = usePopups()
const { viewingCart, cartItems, checkoutItems } = useCart()
const isLoading = ref(false)
const boughtItems = ref<CartItem[]>([])

const didPlaceBids = (items: CartItem[]) => {
  displayPopup({
    type: 'bidding-successful',
    items
  })

  boughtItems.value = items
  viewingCart.value = false
  cartItems.value = []
}

const checkout = async () => {
  isLoading.value = true

  console.log("cartItems.value", cartItems.value)

  const checkout = await checkoutItems(cartItems.value, totalPrice.value)
  isLoading.value = false
  if (checkout)
    didPlaceBids(cartItems.value)


  // viewingCart.value = false

}


const totalPrice = computed(() =>
  roundToDecimals(cartItems.value.map((item) =>
    item.value * (item.sale?.price ?? 0)
  ).reduce((a, b) => a + b, 0), 2)
)
</script>
