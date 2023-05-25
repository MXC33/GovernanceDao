<template lang="pug">
footer(pos="sticky bottom-0" bg="ix-black")
  HList(items="center" text="xl" p="3") 
    h3(text="gray-200" flex-grow="1") Total price
    div(font="bold") {{ totalPrice }} IXT

  button(btn="~ primary" opacity="on-load:50" w="full" font="bold" @click="checkout" :load="isLoading" transition="all") Complete purchase

Teleport(to="body")
  CompletePlacedBids(@close="confirm" :items="boughtItems" v-if="isRevealed")

</template>
  
  
<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart';
import {usePurchase} from "~/composables/usePurchase";

const {
  isRevealed,
  reveal: displaySuccess,
  confirm,
} = useConfirmDialog()

const { viewingCart, cartItems, checkoutItems } = useCart()
const { placeBid } = useBids()

const isLoading = ref(false)
const boughtItems = ref<CartItem[]>([])

const didPlaceBids = (items: CartItem[]) => {
  boughtItems.value = items
  displaySuccess()
  cartItems.value = []
}

const checkout = async () => {
  isLoading.value = true

  console.log("cartItems.value", cartItems.value)

  await checkoutItems(cartItems.value)

  viewingCart.value = false
  isLoading.value = false

  didPlaceBids(cartItems.value)
}

const totalPrice = computed(() =>
  roundToDecimals(cartItems.value.map((item) =>
    item.value * (item.sale?.price ?? 0)
  ).reduce((a, b) => a + b, 0), 2)
)
</script>
  