<template lang="pug">
Popup()
  template(#header) Success!

  template(#default)
    VList(v-for="item in items")
      CompleteItem(:item="item" )

  template(#footer)
    div Quantity {{ items.length }}

  template(#buttons)
    button(@click="closeActivePopup" btn="~ primary") Continue exploring 

</template>
  
  
<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart';
const { closeActivePopup } = usePopups()

defineProps<{
  items: CartItem[]
}>()

defineEmits(["close"])
</script>
  