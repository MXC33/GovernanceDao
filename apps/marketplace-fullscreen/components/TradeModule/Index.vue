<template lang="pug">
VList(w="full" bg="gray-900")
  HList(w="full" justify="between" items="center" b="b-1 gray-600")
    HList()
      TabItem(v-for="tab in tabs" :id="tab" v-model="activeTab") {{ tab }}

    span(color="white" px="6") You own: {{ ownerValue }}

  Transition(name="fade-slow" mode="out-in")
    TradeModuleSell(v-if="activeTab == 'sell'" :item="item")
    TradeModuleBuy(v-else :item="item")

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';


defineProps<{
  ownerValue?: string | number,
  item: SingleItemData
}>()

const { tabs, activeTab } = useTabList(['sell', 'buy'])

</script>