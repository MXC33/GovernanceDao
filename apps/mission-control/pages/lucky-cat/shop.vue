<template lang="pug">
CorporationShop(:header-title="$t(`corporations.lucky-cat.titles.shop`)" :item-name="$t(`general.product`)" v-if="!isComplete")
CorporationCompletePage(v-else)
</template>

<script lang="ts" setup>
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop'
import type { InfoBlock } from '~~/composables/useInfoBlocks';
import type { GenericStoreSaleInfoFragment } from '#gql'
definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

const { t } = useI18n()

const { initializeShop, isComplete, setupPaymentForItem } = useCorporationShop()

const { execute: fetchSaleInfo, data: saleInfoData } = useSaleInfoData('lucky-cat')
const { execute: fetchTokens } = useTokenData()



await Promise.all([
  fetchTokens(),
  fetchSaleInfo(),
])

const raffleInfoModel = (item: GenericStoreSaleInfoFragment): InfoBlock[] => {

  return [
    {
      blockType: 'header',
      title: item.token.tokenInfo.title,
      items: [{
        name: 'CORP.',
        value: `Lucky Cat`,
      }, {
        name: t(`general.price`),
        value: t(`${item.price} ${item.displayPrice}`)
      },
      {
        name: t(`general.amount.amount`),
        value: t(`${item.amount}`)
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
  ]
}


const getLuckyCatShopItem = (item: GenericStoreSaleInfoFragment): CorporationShopItem => ({
  ...item,
  payment: setupPaymentForItem(item),
  infoBlocks: raffleInfoModel(item)
})

const items: CorporationShopItem[] = saleInfoData.value.map(getLuckyCatShopItem)

initializeShop(items)

</script>
