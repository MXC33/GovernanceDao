<template lang="pug">
VList(bg="gray-800" v-if="item")
  header(p="x-6 y-3" font="bold")
    TokenName(:token="item.token")

  HList()
    TokenImage(:token="item.token" w="30" h="30")
    VList(w="full")
      HList(flex-grow="1" pr="3" items="center")
        VList(flex-grow="1" color="gray-200" space-y="1")
          div Planet IX – Assets
          div Available items: 38

        button()
          TrashIcon(w="6")

      Adjustable(v-model="item" h="10")
    
  </template>
  
  
<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart'
import TrashIcon from '~/assets/icons/trash.svg'

const cartElement = ref()

onClickOutside(cartElement, () => viewingCart.value = false)

const { viewingCart } = useCart()

const item = defineModel<CartItem>()

</script>
  