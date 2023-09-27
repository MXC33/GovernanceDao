<template lang="pug">
PopupTokenItemBalance(v-if="item.infoType == 'balance'" :item="item")
PopupTokenItemLink(v-else-if="item.infoType == 'link'" :item="item")
PopupTokenItemAmount(v-else-if="item.infoType == 'amount'" :item="item")

</template>

<script setup lang="ts">
import type { PopupTokenInfoAmount, PopupTokenInfoBalance, PopupTokenInfoLink } from '~~/composables/usePopupToken';

defineProps<{
  item: PopupTokenInfoBalance | PopupTokenInfoLink | PopupTokenInfoAmount
}>()
</script>
