<template lang="pug">
VList()
  HList(text="lg" font="bold" justify="between")
    span() Your Balance
    span(v-if="ixtBalance") {{ ixtBalanceRounded }} IXT
    span(v-else) ... IXT

  HList(justify="end" color="gray-200")
    span(mb="4" v-if="ixtBalance") $ {{ ixtToUSD(ixtBalance) }}

</template>

<script lang="ts" setup>
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";
const { ixtToUSD } = useIXTPrice()
const { ixtBalance, fetchIXT } = useIXTContract()

fetchIXT()

const ixtBalanceRounded = computed(() => roundToDecimals(ixtBalance.value ?? 0, 2))
</script>