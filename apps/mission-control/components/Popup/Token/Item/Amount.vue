
<template lang="pug">
PopupTokenItemContainer()
  template(#default)
    TokenName(:token="item")

  template(#action) 
    span(color="mc-mint") {{ item.amount }}

</template>


<script setup lang="ts">
import type { PopupTokenInfoAmount } from '~~/composables/usePopupToken';


defineProps<{
  item: PopupTokenInfoAmount
}>()
</script>
