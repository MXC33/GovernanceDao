<template lang="pug">
ButtonSound(sound="md" flex="~ col grow" items="center" aspect="square" shop-item="~ on-selected:selected" :selected="isSelected" min-h="0")
  div(flex="~ grow" justify="center" min-h="0")
    TokenImage(:token="item" :isLarge="false" object="contain" min-h="0")

  div(flex="~ col" p="y-2" justify="end" uppercase="~" font="bold")
    div(color="mc-white" ) {{ item.token.tokenInfo?.type }} {{ item.token.tokenInfo?.tier }}
    div(color="$corporation-accent") 
      CorporationShopPriceTag(:price="item.price")

</template>

<script lang="ts" setup>
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop';

defineProps<{
  item: CorporationShopItem,
  isSelected?: boolean,
  balance?: number
}>()
</script>
