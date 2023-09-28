<template lang="pug">
PopupTokenItemContainer(:link="item.link")
  template(#default) {{ item.text }}

  template(#action v-if="item.link?.text") {{ item.link?.text }}

</template>

<script setup lang="ts">
import type { PopupTokenInfoLink } from '~~/composables/usePopupToken';

defineProps<{
  item: PopupTokenInfoLink
}>()
</script>
