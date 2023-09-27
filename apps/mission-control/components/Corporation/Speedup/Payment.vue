<template lang="pug">
HList(uppercase="~" b="1 mc-mint_60 s-accent:$mc-accent-40" p="x5 y3" space-x="2" color="on-not-enough:red-500" :not-enough="cantPay" :state="state" justify="start")
  TokenIcon(:token="payment.token" w="4" :key="getNftTokenKey(payment.token)")

  p(font="bold" p="x-2") {{ $t(`corporations.order.speedup.${payment.token.tokenInfo?.type}`, { cost: cost }) }}

</template>

<script lang="ts" setup>
import type { PaymentOption } from '~/composables/corporations/useSpeedup';
const { getNftTokenKey } = useNFTs()

const props = defineProps<{
  payment: PaymentOption,
  cost: number,
  cantPay?: boolean
  accented?: boolean,

}>()

const state = computed(() => {
  if (props.accented)
    return 'accent'
})
</script>