<template lang="pug">
footer(pos="sticky bottom-0" bg="ix-black" z="lt-md:201")
  HList(items="start" text="xl" p="3")
    h3(font="bold" flex-grow="1") {{ $t(`marketplace.price.title`) }}
    VList()
      div(font="bold") {{ totalPrice }} IXT
      div(text="gray-200 sm") ${{ ixtToUSD(totalPrice) }}

  ButtonInteractive(btn="~ primary" opacity="on-load:50" w="full" font="bold" @click="checkout" :loading="isLoading" transition="all" text="Complete Purchase")
</template>


<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart';
const { ixtToUSD } = useIXTPrice()
const { displayPopup } = usePopups()

const { viewingCart, cartItems, cartFailedSales, checkoutItems, removeFailedItemsFromCart } = useCart()

const { loading: isLoading, execute: buyItems } = useContractRequest(() => checkoutItems(cartItems.value, totalPrice.value), {
  error: () => ({
    title: "Purchase error",
    description: "The purchase failed, following sales will be removed from your cart",
    items: cartFailedSales.value
  }),
  onError: () => {
    removeFailedItemsFromCart()
  }
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
    item.shares.value * (item.ixtPrice ?? 0)
  ).reduce((a, b) => a + b, 0), 2)
)
</script>
