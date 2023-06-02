<template lang="pug">
VList(w="full" bg="gray-900")
  HList(w="full" justify="between" items="center" b="b-1 gray-600" text="lt-md:xs" font="lt-md:bold")
    HList()
      template(v-for="tab in tabs")
        TabItem(:id="tab" v-model="activeTab") {{ tab }}

    span(color="white" px="6" v-if="!is721") You own: {{ item.my_shares }}
    span(color="white" px="6" v-else-if="is721 && canSell") Owned by: You


  Transition(name="fade-slow" mode="out-in")
    TradeModuleSell(v-if="activeTab == 'sell' && item.my_shares > 0" :item="item" :is-disabled="item.bids.length == 0")
    TradeModuleBuy(v-else :item="item" :is-disabled="item.sales.length == 0")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const { item } = defineProps<{
  item: SingleItemData
}>()

const is721 = ERC721Addresses.includes(item.collection)

const cantBuy = computed(() => item.my_shares > 0 && is721)
const canSell = computed(() => item.my_shares > 0)

const { tabs, activeTab } = useTabList(['sell', 'buy'].filter((tab) => {
  if (tab === 'buy') {
    return !cantBuy.value
  } else {
    return cantBuy.value || canSell.value
  }
}))
</script>
