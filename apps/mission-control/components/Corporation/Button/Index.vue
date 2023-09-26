<template lang="pug">
CorporationButtonContainer(@click="onClickButton")
  template(#icon)
    CorporationButtonIcon(:page="page" :icon="icon" :corporation="corporation" size="5 md:8")

  template(#header)
    CorporationButtonTitle(:page="page" :corporation="corporation")

  template(#orders)
    slot(name="orders")
      template(v-if="craftModel?.hasActiveOrders")
        span(v-if="corporation != 'new-lands'")
          | {{ activeOrders }}/{{ craftModel.maxOrders }}
        span(v-else)
          | {{ activeOrders }}/{{ craftModel.maxOrders }}

  template(#content)
    div(display="lt-md:none") {{ $t(`corporations.${corporationRouteI18n}.buttons.${page}.description`) }}
</template>

<script lang="ts" setup>
import type { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract'


const corporation = useActiveCorporation()
const { corporationRouteI18n } = useCorporationRoute()

const props = defineProps<{
  page?: string,
  externalLink?: string,
  icon?: string,
  corporationOrderId?: CorporationOrderId
}>()

const { getOrderState } = useCorporationOrders()

const craftModel = computed(() => {
  if (props.page != 'craft')
    return null

  return getOrderState(props.corporationOrderId)
})
const activeOrders = computed(() => craftModel.value?.orderCount)
const route = useRoute()

const onClickButton = () => {
  console.log("route", route.path)
  if(props.externalLink)
    window.location.href = props.externalLink

  if(!props.page)
    return

  const path = route.path.replace(/\/$/, '');
  navigateTo(`${path}/${props.page}`)
}


</script>
