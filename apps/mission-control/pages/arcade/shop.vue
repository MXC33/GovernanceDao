<template lang="pug">
CorporationShop(:header-title="$t(`corporations.arcade.titles.shop`)" :item-name="$t(`general.product`)" v-if="!isComplete")
CorporationCompletePage(v-else)
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';
import type { InfoBlock } from '~~/composables/useInfoBlocks';

definePageMeta({
  middleware: 'arcade',
  layout: 'corporation'
})

const { t } = useI18n()

const { availableItems, isComplete } = useCorporationShop()
const { execute: fetchTokens } = useTokenData()


await Promise.all([
  fetchTokens(),
])

const arcadeInfoModel = async (item: NftFragment): Promise<InfoBlock[]> => {
  const { data, execute: fetchTokenInfo } = useTokenInfo(item.tokenId, item.contract)
  await fetchTokenInfo()

  return ([
    {
      blockType: 'header',
      title: item.tokenInfo.title,
      items: [{
        name: 'CORP.',
        value: `ARCADE`,
      }, {
        name: 'Supply',
        value: '100\'000'
      }, {
        name: t(`general.price`),
        value: t(`corporations.arcade.shop.${item.tokenInfo.type}.price`)
      }, {
        name: 'Items Owned:',
        valueType: 'tokenBalance',
        oneColumn: true
      }]
    },
    {
      blockType: 'description',
      title: 'Description',
      body: t(`corporations.arcade.shop.${item.tokenInfo.type}.description`),
    },
    {
      blockType: 'description',
      title: 'GWS Metashares Details',
      body: t(`corporations.arcade.shop.${item.tokenInfo.type}.details`)
    }, {
      blockType: 'attributes',
      title: 'Attributes',
      tokenAttributes: true
    }
  ])
}

// const getArcadeShopItem = async (item: NftFragment): Promise<CorporationShopItem> => ({
//   ...addAdjustableToToken(item, { fromUser: false }),
//   infoBlocks: await arcadeInfoModel(item)
// })

// let items: CorporationShopItem[] = [
//   await getArcadeShopItem({ type: 'metashare', tokenId: '30' }),
// ]

// availableItems.value = items
</script>
