<template lang="pug">
VList()
  VList(text="lg" font="bold" justify="between")
    span(color="gray-200")  {{ $t(`marketplace.transactions.yourBalance`) }}
    HList(justify="between")
      span(v-if="ixtBalance") {{ ixtBalanceRounded }} IXT
      span(v-else) -- IXT

      HList(justify="end" color="gray-200" mb="4" font="normal")
        span(v-if="ixtBalance") ${{ usdBalanceRounded }}
        span(v-else) $ --

</template>

<script lang="ts" setup>
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";
const { ixtToUSD } = useIXTPrice()
const { ixtBalance } = useIXTContract()

const ixtBalanceRounded = computed(() => roundToDecimals(ixtBalance.value ?? 0, 2))
const usdBalanceRounded = computed(() => roundToDecimals(ixtToUSD(ixtBalance.value ?? 0), 2))

</script>