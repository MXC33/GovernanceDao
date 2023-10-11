<template lang="pug">
ClientOnly
  ListItem(:id="orderId" :no-select="true" :is-selected="isSelected" :corporation="corporationOrderId.type" @click-action="onClickAction" :tokens="tokens")
    template(#progressbar)
      HelperProgressBarBig(:progress="progress")

    template(#default)
      VList(w="full")
        TitleWithIcon(icon="pointer" font="bold") {{$t(`taskManager.order.${corporation}.${corporationOrderId.task}.title`)}}


        template(v-if="task !== 'upgrade'")
          ListItemProps()
            template(#name) {{ $t(`taskManager.quantity`) }}
            template(#value v-if="corporation !== 'gws'") {{ amount }}
            template(#value v-else) {{ order.orderAmount }}

          ListItemProps()
            template(#name) {{ $t(`taskManager.possibleOutcome`)}}
            template(#value v-if="corporation !== 'gws' && corporationOrderId.task != 'fusion'") {{ $t(`taskManager.tbd`)}}
            template(#value v-else) {{ amount }}

          ListItemProps(v-if="corporation == 'gws'")
            template(#name) 
            template(#value)

          ListItemProps
            template(#name) ET.
            template(#value)
              span(v-if="timeLeft == 'completed'" color="mc-mint") {{ timeLeft }}
              span(v-else color="gray-50") {{ timeLeft }}

        template(v-else)
          ListItemProps()
            template(#name) {{ $t(`taskManager.order.new-lands.upgrade.upgrade`) }}
            template(#value)
              HList(items="center" justify="center")
                span(color="white") LVL.{{ levels.currentLevel }}
                HList(translate-y="-0.25" h="full")
                  ARROW(w="3" mx="1.5")
                span(color="mc-mint") LVL.{{ levels.nextLevel }}

          ListItemProps()
            template(#name) {{ $t(`taskManager.order.new-lands.upgrade.tier`) }}
            template(#value)
              span(:color="tierColorMap") {{ facilityTier }}


          ListItemProps
            template(#name) ET.
            template(#value)
              span(v-if="timeLeft == 'completed'" color="mc-mint") {{ timeLeft }}
              span(v-else color="gray-50") {{ timeLeft }}


    template(#button)
      template(v-if="!isDone")
        div(color="mc-mint-20") {{$t(`general.accelerate`)}}

      template(v-else) {{$t(`general.claim`)}}
</template>

<script setup lang="ts">
import type { OrderFragment } from '#gql';
import type { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract';
import ARROW from '~/assets/images/ui/icons/arrow-regular.svg'

const { activeSpeedupOrder, orderFinishTime, orderIdToListId, orderAmountTaxed } = useCorporationOrders()
const { getProgress } = useTaskManager()
const { claimOrder } = useOrderContracts()

const { astroCreditToken } = useCurrencyData()
const props = defineProps<{
  order: OrderFragment,
  corporationOrderId: CorporationOrderId
}>()

const onClickAction = () => {
  if (!isDone.value)
    onClickSpeedup()
  else
    onClickClaim()
}
const amount = computed(() =>
  orderAmountTaxed(props.order.orderAmount, props.corporationOrderId)
)

const onClickClaim = () => {
  claimOrder(props.corporationOrderId, props.order.orderId)
}

const onClickSpeedup = () => {
  activeSpeedupOrder.value = {
    order: props.order,
    corporation: props.corporationOrderId,
    payToken: astroCreditToken.value
  }
}

const corporation = computed(() => props.corporationOrderId.type)
const task = computed(() => props.corporationOrderId.task)
const progress = computed(() => getProgress(props.order, currentTime.value))

const isSelected = computed(() => activeSpeedupOrder.value?.order?.orderId == props.order.orderId)

const orderId = computed(() => orderIdToListId(props.order))

const finishTime = computed(() => orderFinishTime(props.order))

const currentTime = useTimestamp({ interval: 1000 })

const timeLeft = computed(() => {
  if (isDone.value)
    return 'completed'

  const { days, hours, minutes, seconds } = useIntervalWithDays(currentTime.value, finishTime.value)

  const optDays = days > 0 ? `${days}D.` : ''
  return `${optDays}${hours}H.${minutes}M.${seconds}S`
})

const isDone = computed(() => progress.value >= 100)

const levels = computed(() => {
  const currentLevel = FacilityLevelMap[props.order?.orderTokenId]
  return {
    currentLevel: currentLevel,
    nextLevel: currentLevel + 1
  }
})

const getOrderTokenIds = () => {
  if (props.corporationOrderId.task == 'fusion')
    return [0] // m3ta-mod

  if (!props.order?.orderTokenId)
    return []

  const facilityTier = FacilityTierMap[props.order.orderTokenId]

  if (!facilityTier)
    return []

  return getNextLevelTokenIds(props.order?.orderTokenId, facilityTier)
}

const orderTokens = getOrderTokenIds()
const { data: tokens, execute: fetchTokens } = useTokensInfo(orderTokens)

if (orderTokens.length > 0)
  await fetchTokens()

const facilityTier = computed(() => FacilityTierMap[props.order.orderTokenId])

const tierColorMap = computed(() => {
  switch (FacilityTierMap[props.order.orderTokenId]) {
    case 'outlier':
      return 'tier-white'
    case 'common':
      return 'tier-green'
    case 'uncommon':
      return 'tier-blue'
    case 'rare':
      return 'tier-purple'
    case 'legendary':
      return 'tier-gold'
  }
})

</script>

