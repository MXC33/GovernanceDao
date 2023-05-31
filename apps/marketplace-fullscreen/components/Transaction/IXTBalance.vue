<template lang="pug">
VList()
  HList(text="lg" font="bold" justify="between")
    span() Your Balance
    span(v-if="ixt") {{ ixtBalanceRounded }} IXT
    span(v-else) ... IXT

  HList(justify="end" color="gray-200")
    span(mb="4" v-if="ixt") $ {{ ixtToUSD(ixt) }}

</template>

<script lang="ts" setup>
const { ixtToUSD } = useIXTPrice()
const { ixtBalance } = getIXTokenContract()
const { data: ixt, refresh: fetchIXT } = ixtBalance()
fetchIXT()

const ixtBalanceRounded = computed(() => roundToDecimals(ixt.value ?? 0, 2))
</script>