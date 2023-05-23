<template lang="pug">
VList(bg="gray-800" v-if="item")
  header(p="x-6 y-3" font="bold" flex="~ row")
    TokenName(:token="item.token")

    div(whitespace="nowrap") {{ item.sale?.price }} IXT

  HList()
    TokenImage(:token="item.token" w="30" h="30")
    VList(w="full")
      HList(flex-grow="1" px="3" items="center")
        VList(flex-grow="1" color="gray-200" space-y="1")
          div Planet IX – Assets
          div(v-if="item.sale") Available items: {{item.sale?.quantity}}
          div(flex-grow="1")

        button(@click="removeFromCart(item)")
          TrashIcon(w="6")

      Adjustable(v-model="item" h="3")
    
</template>
  
<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart'
import TrashIcon from '~/assets/icons/trash.svg'

const cartElement = ref()

onClickOutside(cartElement, () => viewingCart.value = false)

const { viewingCart, removeFromCart } = useCart()

const item = defineModel<CartItem>()

</script>
  