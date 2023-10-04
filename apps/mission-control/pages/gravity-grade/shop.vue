<template lang="pug">
CorporationShop(:header-title="$t(`corporations.gravity-grade.titles.shop`)" :item-name="$t(`general.product`)" v-if="!isComplete")
CorporationCompletePage(v-else)
</template>

<script lang="ts" setup>
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop';
import type { InfoBlock, InfoBlockTable } from '~~/composables/useInfoBlocks';
import type { GenericStoreSaleInfoFragment, NftFragment } from '#gql'

definePageMeta({
  layout: 'corporation'
})

const { t } = useI18n()
const { fetchAllCurrencies } = useCurrencyData()
const { isComplete, initializeShop, setupPaymentForItem } = useCorporationShop()
const { execute: fetchSaleInfo, data: saleInfoData } = useSaleInfoData('gravity-grade')

await Promise.all([fetchSaleInfo(), fetchAllCurrencies()])

const getTypeName = (item: NftFragment) => {
  switch (item.tokenInfo.type) {
    case 'gg2':
      return 'GG® GEN.2 DROP'
    case 'gg-energy':
    case 'gg2-energy':
    case 'gg3-energy':
    case 'gg4-energy':
      return 'GG® ENERGY DROP'
  }
}


const ggPackInfoModel = async (item: GenericStoreSaleInfoFragment): Promise<InfoBlock[]> => {

  const { data, execute: fetchGGContents } = useGravityGradePackContentData({ type: item.token.tokenInfo.type, tier: item.token.tokenInfo.tier })
  await fetchGGContents()

  const getMetaInfo = (): InfoBlockTable | null => {

    return {
      blockType: 'table',
      items: data.value?.map(item => {
        return {
          name: t(`${item.token.tokenInfo.title}`),
          value: t(`X${item.token.balance}`),
          state: 'active'
        }
      })
    }
  }

  return ([
    {
      blockType: 'header',
      title: getTypeName(item.token),
      items: [{
        name: t(`${item.token.tokenInfo.tier}`),
        value: 'Pack',
        oneColumn: true,
      }, {
        name: 'Supply',
        value: item.supplyText
      }, {
        name: t(`general.price`),
        value: t(`${item.price} ${item.displayPrice}`),
        state: 'active'
      }, {
        name: 'Items Owned:',
        valueType: 'tokenBalance',
        oneColumn: true
      }]
    },
    {
      blockType: 'description',
      title: 'Description',
      body: item.token.tokenInfo.description,
    },
    {
      blockType: 'description',
      title: 'Pack Details',
      metaInfo: getMetaInfo(),
    },
    {
      blockType: 'attributes',
      title: 'Attributes',
      tokenAttributes: true
    },
  ])
}

const getGGShopItem = async (item: GenericStoreSaleInfoFragment): Promise<CorporationShopItem> => ({
  ...item,
  payment: setupPaymentForItem(item),
  infoBlocks: await ggPackInfoModel(item)
})


const items: Promise<CorporationShopItem[]> = Promise.all(saleInfoData.value.map(item => getGGShopItem(item)))

const itemResolved = await items


initializeShop(itemResolved)
</script>