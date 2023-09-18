<template lang="pug">
CorporationCartRow(v-if="item.price == 99999")
  //- HList(grid="col-span-1" color="$mc-accent" items="center" justify="center" p="4") BUY ON OPENSEA 
  HList(grid="col-span-2" cursor="pointer" bg="$mc-accent" color="mc-black" font="bold" text="base" justify="center" items="center" p="4") {{$t(`general.goOpenSea`)}}

template(v-else)
  //- CorporationShopAddToCartRow()
  //-   div {{$t('general.qty')}}
  //-   div {{ item.value }} / {{ item.max }}
  CorporationCartRow()
    CorporationShopAddToCartRow(grid="col-span-2" text="sm" font="normal" px="4")
      div {{$t('general.total')}}
      div(color="$mc-accent") {{ totalPrice }}

  CorporationCartRow()
    HelperAdjustable(v-if="canAdjust" v-model="item.payment" font="bold" text="sm" space-x="0" )
    div(v-else flex="~ col" justify="center" color="$mc-accent" items="center" uppercase="~")
      template(v-if="totalBalance > 0") {{ $t(`general.owned`) }} {{ totalBalance }}
      template(v-else) {{  $t('general.notOwned') }}


    ButtonSound(v-if="!canAdjust" grid="col-span-1" sound="sm" btn="~ accent-filled on-disable:disable" @click="onClick(item)" :disable="!canBuy" v-model="item") {{$t(`corporations.y-space.actions.purchase`)}}
    ButtonSound(v-else grid="col-span-1" sound="sm" btn="~ accent-filled on-disable:disable" @click="onClick(item)" :disable="!canBuy" v-model="item") {{$t(`corporations.y-space.actions.purchase`)}}

</template>

<script lang="ts" setup>
import type { ContractTier } from '~/composables/useTileRings';
import type { AdjustableToken } from '~/composables/useAdjustableNumber';
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop';

const props = defineProps<{
  item: CorporationShopItem
}>()

const item = defineModel<CorporationShopItem>()

const { t } = useI18n()

const { buyNFT } = useBuyNFTs()
const { gotoCompleted, setupPaymentForItem } = useCorporationShop()
const { fetchAllCurrencies } = useCurrencyData()
const { balanceOfToken } = useUserData()
const { convertAsset } = useAssetConverter()

await fetchAllCurrencies()

const popup = usePopups()

const balanceOfStakedToken = computed(() => {
  const { tokenInfo } = item.value.token
  return useStakedDataBalance(tokenInfo?.type, tokenInfo.tier).value
})

const balance = computed(() => balanceOfToken(props.item.token))
const totalBalance = computed(() => balance.value + balanceOfStakedToken.value)

const totalPrice = computed(() => {
  if (item.value.price == 0)
    return t('general.free')

  const price = item.value.payment.value * item.value.price
  return `${price} ${item.value.displayPrice}`
})

const canAdjust = computed(() =>
  item.value?.payment.min != item.value?.payment.max
)

const canBuy = computed(() => {
  const { payment } = item.value

  if (!payment.value)
    return false

  if (item.value?.inStock == false)
    return false

  const stakedCount = balanceOfStakedToken.value
  const balanceCount = balanceOfToken(payment.token)

  if (item.value?.unique)
    return stakedCount == 0 && balanceCount == 0

  if (payment.fromUser)
    return balanceCount >= payment.value * payment.payment.price

  return true
})

const onClick = async (item: CorporationShopItem) => {

  if (props.item.displayPrice == 'waste' && props.item.price > 0) {
    const didBuy = convertAsset(item)
    if (didBuy)
      return gotoCompleted()
  }
  if (props.item.price == 0) {
    const didBuy = await buyNFT(item, null)
    if (didBuy)
      return gotoCompleted()
  } else if (props.item.price > 0) {
    popup.value = 'payments'
  }
}

</script>

