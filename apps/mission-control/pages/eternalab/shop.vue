<template lang="pug">
CorporationShop(:header-title="$t(`corporations.eternalab.titles.shop`)" :item-name="$t(`general.product`)" v-if="!isComplete" currency="waste")
CorporationCompletePage(v-else)
</template>

<script lang="ts" setup>
import type { GenericStoreSaleInfoFragment } from '#gql';
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop';
import type { InfoBlock } from '~~/composables/useInfoBlocks';

const { execute: fetchTokenData } = useTokenData()
const { execute: fetchSaleInfo, data: saleInfoData } = useSaleInfoData('eternalab')

await Promise.all([
  fetchTokenData(),
  fetchSaleInfo(),
])


definePageMeta({
  layout: 'corporation'
})

const { t } = useI18n()
const { isComplete, initializeShop, setupPaymentForItem } = useCorporationShop()

const biomodInfoModel = (item: GenericStoreSaleInfoFragment): InfoBlock[] => {

  return ([
    {
      blockType: 'header',
      title: item.token.tokenInfo?.title,
      items: [{
        name: 'CORP.',
        value: 'Eternalab',
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
      body: t(`${item.token.tokenInfo?.description}`),
    },
    {
      blockType: 'attributes',
      title: 'Attributes',
      tokenAttributes: true
    }
  ])
}


const getEternaLabShopItem = (item: GenericStoreSaleInfoFragment): CorporationShopItem => ({
  ...item,
  payment: setupPaymentForItem(item),
  infoBlocks: biomodInfoModel(item)
})

const items: CorporationShopItem[] = saleInfoData.value.map(item => getEternaLabShopItem(item))

initializeShop(items)
</script>