<template lang="pug">
ButtonSound(@click="onClickAccelerate" sound="md" pos="absolute" bg="black opacity-80" w="full" h="full" b="1 $mc-accent-40"  justify="center" flex="~ col" items="stretch" uppercase="~" group)

  div(b="1 $mc-accent-40" bg="$mc-accent-10" p="1" text="$mc-accent" m="x-10" )
    span {{activeOrders.length}}/{{ craftState.maxOrders }} {{ $t('corporations.overview.inactiveMenu') }}
    HelperTimeLeft(:finishTime="orderFinishTime(orderWithTimeLeft)")

  div(b="1 $mc-accent-40" bg="$mc-accent" text="black" p="1" flex="~" justify="between" m="x-10" opacity="group-hover:60") 
    p {{ $t('corporations.overview.accelerate') }}
    ArrowIcon(fill="black" grid="col-span-1" w="6")

</template>

<script lang="ts" setup>
import ArrowIcon from '~/assets/images/ui/corporations/arrow.svg'
import type { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract';

const { getOrderState, orderFinishTime, gotoLatestSpeedupOrder } = useCorporationOrders()

const orderWithTimeLeft = computed(() =>
  activeOrders.value.sort((a, b) => orderFinishTime(b) - orderFinishTime(a))[0]
)

const craftState = computed(() => getOrderState(props.corporation))

const activeOrders = computed(() => craftState.value.orders ?? [])

const onClickAccelerate = async () => {
  gotoLatestSpeedupOrder(props.corporation)
}

const props = defineProps<{
  corporation: CorporationOrderId
}>()
</script>