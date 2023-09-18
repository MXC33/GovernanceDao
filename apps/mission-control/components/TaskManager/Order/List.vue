<template lang="pug">
TaskManagerCorporationList(:has-items="hasOrders")
  template(#default)
    TaskManagerOrderItem(v-for="order in activeOrders" :order="order" :corporation-order-id="corporationOrderId")

  template(#noItems) {{$t(`taskManager.noOrders`)}}
  
</template>

<script setup lang="ts">
import type { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract';
const { ordersInCorporationId } = useCorporationOrders()

const hasOrders = computed(() =>
  activeOrders.value.length > 0
)

const props = defineProps<{
  corporationOrderId: CorporationOrderId
}>()

const activeOrders = computed(() => ordersInCorporationId(props.corporationOrderId))

</script>
