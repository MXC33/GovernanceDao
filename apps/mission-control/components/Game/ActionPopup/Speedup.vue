<template lang="pug">
GameActionPopup(:title="$t(`general.accelerateTask`)" :confirm-text="$t(`general.confirm`)" @cancel="onClickCancel" @confirm="onClickEnter" :mobile-takeover="true" :disable-confirm="false")  
  CorporationSpeedup(:finish-time="finishTime", :total-time="totalTime", :payments="paymentTokens" :max-cost="maxCost" v-model="purchase")
        
</template>

<script lang="ts" setup>
import type { OrderFragment } from '#gql'
import type { NftFragment } from '#gql';
import type { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract';
import type { SelectedPurchase } from '~/composables/corporations/useSpeedup';

const { orderFinishTime, activeSpeedupOrder, orderSpeedupCost } = useCorporationOrders()
const { speedupOrder } = useOrderContracts()
const { ixtToken, astroCreditToken } = useCurrencyData()
const purchase = ref<SelectedPurchase>()
const finishTime = computed(() => orderFinishTime(props.order) / 1000)
const totalTime = computed(() => props.order.defaultOrderTime)
const tokens = computed<NftFragment[]>(() => {
  if (activeSpeedupOrder.value.corporation.task == 'upgrade')
    return [ixtToken.value]
  return [astroCreditToken.value, ixtToken.value]
})

const paymentTokens = computed(() =>
  tokens.value.map((token) => ({
    token,
    cost: orderSpeedupCost(props.corporation, token)
  }))
)

console.log(activeSpeedupOrder.value)
const props = defineProps<{
  order: OrderFragment,
  corporation: CorporationOrderId,
}>()

const maxCost = computed(() => {
  if (props.order.type == 'gws' && purchase.value?.token?.type == 'astro-credit')
    return props.order.orderAmount
  return null
})

const onClickCancel = () => {
  activeSpeedupOrder.value = null
}

const onClickEnter = () => {
  const { orderId } = props.order
  console.log("ORDER", purchase.value)
  speedupOrder(props.corporation, orderId, purchase.value)
}

</script>