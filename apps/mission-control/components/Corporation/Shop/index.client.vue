<template lang="pug">
CorporationItemsAndDetail(:list-title="itemName" v-model="activeShopItem" :list="availableItems" detail-title="Details" :header="headerTitle" :currency="currency")

  template(#noItems v-if="availableItems.length == 0")
    HelperWarning(bg="white opacity-10") {{ $t(`general.no-items`) }}

  template(#grid)
    CorporationShopItem(v-for="item in availableItems" :item="item" v-model="activeShopItem")

  template(#cartRight)
    CorporationShopAddToCart(v-model="activeShopItem" v-if="activeShopItem" :item="activeShopItem")


</template>

<script lang="ts" setup>
import type { Currency } from '@ix/base/composables/Utils/useCurrencies';

const { availableItems, activeShopItem } = useCorporationShop()

defineProps<{
  headerTitle?: string,
  itemName: string,
  currency?: Currency
}>()
</script>