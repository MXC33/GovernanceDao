<template lang="pug">
CorporationShop(:header-title="$t(`corporations.gws.titles.shop`)" :item-name="$t(`general.product`)" v-if="!isComplete")
CorporationCompletePage(v-else)
</template>

<script lang="ts" setup>
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop'
import type { InfoBlock } from '~~/composables/useInfoBlocks';
import type { GenericStoreSaleInfoFragment } from '#gql'
definePageMeta({
  layout: 'corporation'
})

const { t } = useI18n()

const { initializeShop, isComplete } = useCorporationShop()

const { execute: fetchTokens } = useTokenData()
const { execute: fetchGWSInfo } = useGWSData()
// const { execute: fetchSaleInfo, data: saleInfoData } = useSaleInfoData('gws')

await Promise.all([
  fetchTokens(),
  fetchGWSInfo(),
  // fetchSaleInfo(),
])

const metashareInfoModel = async (item: GenericStoreSaleInfoFragment): Promise<InfoBlock[]> => {

  return ([
    {
      blockType: 'header',
      title: item.token.tokenInfo.title,
      items: [{
        name: 'CORP.',
        value: `GWS`,
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
      blockType: 'description',
      title: 'GWS Metashares Details',
      body: t(`corporations.gws.shop.${item.token.tokenInfo.type}.details`)
    }, {
      blockType: 'attributes',
      title: 'Attributes',
      tokenAttributes: true
    }
  ])
}


const items: CorporationShopItem[] = []

initializeShop(items)
</script>
