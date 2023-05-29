<template lang="pug">
VList(w="full" bg="gray-900")
  HList(w="full" justify="between" items="center" b="b-1 gray-600")
    HList()
      template(v-for="tab in tabs")
        TabItem(:id="tab" v-model="activeTab") {{ tab }}

    span(color="white" px="6") You own: {{ item.my_shares }}

  Transition(name="fade-slow" mode="out-in")
    TradeModuleSell(v-if="activeTab == 'sell' && item.my_shares > 0" :item="item")
    TradeModuleBuy(v-else :item="item")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';

const { item } = defineProps<{
  item: SingleItemData
}>()
const canSell = computed(() => item.my_shares > 0)

const { tabs, activeTab } = useTabList(['sell', 'buy'].filter((tab) => tab == 'buy' || canSell.value))

</script>