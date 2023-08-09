<template lang="pug">
VList(bg="gray-900" v-if="item")
  header(p="x-6 y-3" font="bold" flex="~ row" b="b-1 gray-600")
    TokenName(:token="item.token")

    div(whitespace="nowrap") {{ item.sale?.price }} IXT

  HList()
    VList(w="30" h="30" justify="center" pos="relative" bg="black")
      TokenImage(:token="item.token" min-w="30" h="30")

    VList(w="full")
      HList(flex-grow="1" px="3" items="center")
        VList(flex-grow="1" color="gray-200")
          TokenCollection(:token="item.token")
          div(v-if="item.sale") Available items: {{item.sale?.quantity}}
          div(flex-grow="1")

        button(@click="removeFromCart(item)")
          TrashIcon(w="6")

      Adjustable(v-model="item.shares" h="10" :has-frame="false" :is-popup="true")
    
</template>

<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart'
import TrashIcon from '~/assets/icons/trash.svg'

const cartElement = ref()

onClickOutside(cartElement, () => viewingCart.value = false)

const { viewingCart, removeFromCart, cartItemFailed } = useCart()

const item = defineModel<CartItem>()

const isFailed = computed(() => item.value && cartItemFailed(item.value))
</script>
