<template lang="pug">
CorporationShop(:header-title="$t(`corporations.haveblue.titles.shop`)" :item-name="$t(`general.product`)" v-if="!isComplete")
CorporationCompletePage(v-else)
</template>

<script lang="ts" setup>
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop';
import type { InfoBlock } from '~~/composables/useInfoBlocks';
import type { GenericStoreSaleInfoFragment, NftFragment } from '#gql'
definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

const { t } = useI18n()
const { initializeShop, isComplete, setupPaymentForItem } = useCorporationShop()
const { fetchAllCurrencies } = useCurrencyData()

const { execute: fetchSaleInfo, data: saleInfoData } = useSaleInfoData('haveblue')



await Promise.all([fetchSaleInfo(), fetchAllCurrencies()])

const infoModel = (item: GenericStoreSaleInfoFragment): InfoBlock[] => {

  return ([
    {
      blockType: 'header',
      title: item.token.tokenInfo.title,
      items: [{
        name: 'CORP.',
        value: 'Haveblue',
      }, {
        name: 'Supply',
        value: item.supplyText
      }, {
        name: t(`general.price`),
        value: t(`${item.price} ${item.displayPrice}`)
      }, {
        name: 'Items Owned:',
        valueType: 'tokenBalance',
        oneColumn: true
      }]
    },
    {
      blockType: 'description',
      title: 'Description',
      body: t(`${item.token.tokenInfo.description}`),
    },
    {
      blockType: 'attributes',
      title: 'Attributes',
      tokenAttributes: true
    }
  ])
}


const getHaveBlueItem = (item: GenericStoreSaleInfoFragment): CorporationShopItem => ({
  ...item,
  payment: setupPaymentForItem(item),
  infoBlocks: infoModel(item)
})

const items: CorporationShopItem[] = saleInfoData.value.map(getHaveBlueItem)

initializeShop(items)
</script>