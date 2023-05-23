<template lang="pug">
VList(w="full" bg="gray-900")
  HList(w="full" justify="between" items="center" b="b-1 gray-600")
    HList()
      TabItem(v-for="tab in tabs" :id="tab" v-model="activeTab") {{ tab }}

    span(color="white" px="6") You own: {{ ownerValue }}

  Transition(name="fade-slow" mode="out-in")
    TradeModuleSell(v-if="activeTab == 'sell'")
    TradeModuleBuy(v-else)

</template>

<script lang="ts" setup>

defineProps<{
  ownerValue?: string | number
}>()

const { tabs, activeTab } = useTabList(['sell', 'buy'])

</script>