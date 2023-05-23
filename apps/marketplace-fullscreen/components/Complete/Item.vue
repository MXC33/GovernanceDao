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
          div(flex-grow="1")
    
</template>
  
<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart'

defineProps<{
  item: CartItem
}>()

</script>
  