<template lang="pug">
Popup(@close="$emit('close')")
  template(#header) Success!

  template(#default)
    VList(v-for="item in items")
      CompleteItem(:item="item" )

  template(#footer)
    div Quantity {{ items.length }}
    button(@click="$emit('close')") Continue exploring 

</template>
  
  
<script lang="ts" setup>
import type { CartItem } from '~/composables/useCart';

defineProps<{
  items: CartItem[]
}>()

defineEmits(["close"])
</script>
  