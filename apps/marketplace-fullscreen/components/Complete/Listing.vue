<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) LIST SUCCESSFUL!

  template(#default)
    TokenSlideshow(:tokens="items")

  template(#footer)
    div Quantity {{ items.length }}

  template(#buttons)
    button(@click="closeActivePopup" btn="~ primary") Continue exploring 

</template>
  
  
<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { ListingItem } from '~/composables/useListing';
const { closeActivePopup } = usePopups()
defineProps<{
  items: ListingItem[]
}>()

defineEmits(["close"])
</script>
  