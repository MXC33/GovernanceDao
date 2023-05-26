<template lang="pug">
footer(pos="sticky bottom-0" bg="ix-black")
  HList(items="center" text="xl" p="3") 
    h3(text="gray-200" flex-grow="1") Total price
    div(font="bold") {{ totalPrice }} IXT

  button(btn="~ primary" opacity="on-load:50" w="full" font="bold" @click="placeBids" :load="isLoading" transition="all") Complete purchase
</template>
  
  
<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart';

const { displayPopup } = usePopups()
const { viewingCart, cartItems } = useCart()
const { placeBid } = useBids()
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

const placeBids = async () => {
  isLoading.value = true
  const first = cartItems.value[0]

  if (!first)
    return isLoading.value = false

  console.log("Place", first)

  // await placeBid(first)

  // viewingCart.value = false
  isLoading.value = false

  didPlaceBids(cartItems.value)
}

const totalPrice = computed(() =>
  roundToDecimals(cartItems.value.map((item) =>
    item.value * (item.sale?.price ?? 0)
  ).reduce((a, b) => a + b, 0), 2)
)
</script>
  