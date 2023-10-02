<template lang="pug">
CorporationItemsAndDetailWrapper(:active-item="displayModel"  detail-title="Active Item" :list="activeRecipe" @close="onClose")

  template(#tabs)
    CorporationItemsAndDetailTab(v-for="tab in tabs" @click="onClickTab(tab)" :is-selected="isTabActive(tab)") {{ spaceCaseIt(tab) }}

  template(#infoBlocks v-if="isTabActive('activeOrders')")

    HelperWarning(bg="gray opacity-10" v-if="orders.length == 0") {{ $t(`general.orders.noActiveOrders`) }}

    InfoBlock(:block="order" v-for="order in orders") 

  template(#list)
    template(v-for="(item, index) in outputWithWeight")
      CorporationItemsAndDetailAdjustableItem(v-model="activeRecipe[index]" :output-tokens="itemOutputImage(item)" :disable-slideshow="item.payment.details == 'levelOutput'" :disabled="!isEnabled(index)" :is-locked="isEnabled(index)")

        HList(space-x="2" v-for="output in item.weights" v-if="item.payment.details == 'outputs'")
          TokenName(:token="output.token")
          div(color="$mc-accent") {{output.percentage}}%

        HList(space-x="2" px="1" v-for="output in item.weights" v-else-if="item.payment.details == 'levelOutput'" items="center")
          div() LVL.{{ output.token?.tokenInfo?.level }}
          div(color="$mc-accent") {{output.percentage}}%

        HList(v-else space-x="2")
          div() {{ $t(`general.orders.orderSlotsColon`) }}
          div(text="$mc-accent") {{ item.payment.value / item.payment.multiplier  }}/{{ itemMaxOrders }}

  template(#cartRight)
    CorporationCartRow()
      HList(justify="center" items="center" space-x="2" uppercase="~")
        div(color="$mc-accent") {{ blockActiveOrders(activeOrders)  }}/{{ maxOrders }}
        div(color="$corporation-text-color") {{ $t(`general.orders.orderSlots`) }}

      ButtonSound(sound="sm" btn="~ accent-filled on-disable:disable" @click="onClickPlaceOrder" :disable="!canPlaceOrder") 
        slot(name="confirmButton")
          span {{ $t(`corporations.${corporationRouteI18n}.cartInfo`) }}
      

</template>
    
<script lang="ts" setup>
import type { NftFragment, OrderFragment } from '#gql';
import { spaceCaseIt } from 'case-it';
import type { CorporationPaymentToken } from '~/composables/corporations/useCorporations';
import type { TokenWeightAndPayment } from '~/composables/corporations/useTokenWeights';
import type { InfoBlock, InfoBlockItem, InfoBlockSlideshow, TokenWithInfoBlocks } from '~/composables/useInfoBlocks';

const { activeCorporationOrderId, activeRecipe, activeState, activeRecipeValid, orderIsFinished, orderFinishTime, gotoCompleted, infoOutputBlocks, hasMinimumReqRecipeItems } = useCorporationOrders()
const { placeOrder } = useOrderContracts()
const { corporationRouteI18n } = useCorporationRoute()

const onClose = () => {
  console.log("YO")
}

const { getAdjustableTokenOutputs } = useTokenWeights()
const { onClickTab, isTabActive, tabs } = useTabList(["newOrders", "activeOrders"])
const { t } = useI18n()

const activeOrders = computed(() => activeState.value?.orders ?? [])
const maxOrders = computed(() => activeState.value?.maxOrders ?? 0)
const hasFreeOrderSlots = computed(() => activeOrders.value.length < maxOrders.value)

const canPlaceOrder = computed(() => activeRecipeValid.value && hasMinimumReqRecipeItems.value && hasFreeOrderSlots.value)

console.log("Min Recipe", hasMinimumReqRecipeItems.value, "Active recipe", activeRecipeValid.value, "Order slots", hasFreeOrderSlots.value)

const outputWithWeight = computed(() =>
  getAdjustableTokenOutputs(activeRecipe.value)
)

const blockActiveOrders = (orders: OrderFragment[]) => {
  if (activeCorporationOrderId.value.type == 'gws')
    return orders.length * orders.map(item => item.orderAmount).reduce((a, b) => a + b, 0) / 25

  return orders.length
}

const isEnabled = (index: number) => {
  const item = activeRecipe.value[index]
  if (!item?.unique) {
    return true
  }

  const itemIsDirty = (item: CorporationPaymentToken) =>
    item.value != item.min

  const dirtyIndex = activeRecipe.value.findIndex((item) => itemIsDirty(item))

  return dirtyIndex == -1 || dirtyIndex == index
}

const itemMaxOrders = computed(() => {
  if (activeCorporationOrderId.value.type == 'gws')
    return maxOrders.value - activeOrders.value.map(item => item.orderAmount).reduce((a, b) => a + b, 0) / 25
  else
    return maxOrders.value - activeOrders.value.length
})

const orders = computed<InfoBlock[]>(() => {
  if (activeOrders.value.length == 0)
    return []

  return [
    {
      blockType: 'sectionHeader',
      title: `${t(`corporations.${corporationRouteI18n.value}.orderName`)} ${activeOrders.value.length}/${maxOrders.value}`
    },
    {
      blockType: 'table',
      items: activeOrders.value.map(createOrderBlock)
    }
  ]
})

const onClickPlaceOrder = async () => {
  const didPlace = await placeOrder(activeCorporationOrderId.value)
  if (didPlace)
    gotoCompleted()
  return true
}

const currentTime = useTimestamp({ interval: 1000 })

const getTimeLeft = (order: OrderFragment) => {
  if (orderIsFinished(order, currentTime.value))
    return 'completed'

  const { hours, minutes, seconds } = useIntervalWithDays(currentTime.value, orderFinishTime(order))
  return `${hours}H.${minutes}M.${seconds}S`
}


const createOrderBlock = (order: OrderFragment): InfoBlockItem => ({
  name: t(`corporations.${corporationRouteI18n.value}.orderName`),
  value: `${getTimeLeft(order)}`,
  state: 'active',
  noAnimation: true
})

const itemOutputImage = (token: TokenWeightAndPayment) => {
  return token.weights.map(item => item.token).filter(Boolean)

}

const props = defineProps<{
  mediaBlock?: InfoBlock | InfoBlockSlideshow,
  blocks?: InfoBlock[],
  showProbabilities?: boolean,
  outputToken: NftFragment,
}>()

const imageBlock = computed<InfoBlock>(() => {
  if (props.mediaBlock)
    return props.mediaBlock

  return {
    blockType: 'image'
  }
})

const probabilityBlock = computed<InfoBlock>(() => ({
  blockType: 'description',
  title: t(`corporations.${corporationRouteI18n.value}.probabilityTitle`),
  metaInfo: {
    blockType: 'table',
    items: infoOutputBlocks.value,
  }
}))

const displayModel = computed<TokenWithInfoBlocks>(() => ({
  token: props.outputToken,
  infoBlocks: [
    imageBlock.value,
    ...(props.showProbabilities ? [probabilityBlock.value] : []),
    ...(props.blocks ?? [])
  ]
}))

</script>