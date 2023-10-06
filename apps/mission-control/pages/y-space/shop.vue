<template lang="pug">
CorporationShop(:header-title="$t(`corporations.y-space.titles.shop`)" :item-name="$t(`general.product`)" v-if="!isComplete")
CorporationCompletePage(v-else)
</template>

<script lang="ts" setup>
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop'
import type { InfoBlock, InfoBlockTable } from '~~/composables/useInfoBlocks';
import type { GenericStoreSaleInfoFragment, NftFragment } from '#gql'
definePageMeta({
  layout: 'corporation'
})

const { t } = useI18n()

const { initializeShop, isComplete, setupPaymentForItem } = useCorporationShop()

const { execute: fetchTokens } = useTokenData()
const { execute: fetchAvatars } = useAvatarNFTData()
const { execute: fetchSaleInfo, data: saleInfoData } = useSaleInfoData('y-space')


await Promise.all([
  fetchTokens(),
  fetchAvatars(),
  fetchSaleInfo()
])

const roverInfoModel = (item: GenericStoreSaleInfoFragment): InfoBlock[] => {

  const getMetaInfo = (): InfoBlockTable | null => {
    // if (item.type == 'rover')

    return {
      blockType: 'table',
      items: [{
        name: 'RVR Night',
        value: '1%',
        state: 'active',
      }, {
        name: 'RVR Genesis',
        value: '10%',
        state: 'active',
      }, {
        name: 'RVR Piercer',
        value: '89%',
        state: 'active',
      }]
    }

  }

  return ([
    {
      blockType: 'header',
      title: item.token.tokenInfo.title,
      items: [{
        name: 'ID: ',
        value: `0`,
        oneColumn: true
      }, {
        name: 'Tier',
        value: 'Tbd'
      }, {
        name: t(`general.price`),
        value: t(`${item.price} ${item.displayPrice}`)
      }]
    },
    {
      blockType: 'description',
      title: 'Y_ RVR Details',
      body: t(`corporations.y-space.shop.${item.token.tokenInfo.type}.description`),
      metaInfo: getMetaInfo()
    },
    {
      blockType: 'details',
      title: 'Performance Details',
      sections: [
        {
          title: 'Night Rover',
          items: [{
            name: 'Collecting Speed',
            value: '30 Waste / 24 H'
          }, {
            name: 'Max Capacity',
            value: '300 Waste'
          }, {
            name: 'Discover M3ta-M0d Rate',
            value: '5%'
          }]
        }, {
          title: 'Genesis Rover',
          items: [{
            name: 'Collecting Speed',
            value: '24 Waste / 24 H'
          }, {
            name: 'Max Capacity',
            value: '240 Waste'
          }, {
            name: 'Discover M3ta-M0d Rate',
            value: '0.5%'
          }]
        }, {
          title: 'Piercer Rover',
          items: [{
            name: 'Collecting Speed',
            value: '16 Waste / 24 H'
          }, {
            name: 'Max Capacity',
            value: '160 Waste'
          }, {
            name: 'Discover M3ta-M0d Rate',
            value: '0.05%'
          }]
        }
      ]
    }, {
      blockType: 'attributes',
      title: 'Attributes',
      tokenAttributes: true
    }
  ])
}

const getRoverShopItem = (item: GenericStoreSaleInfoFragment): CorporationShopItem => ({
  ...item,
  payment: setupPaymentForItem(item),
  infoBlocks: roverInfoModel(item)
})


const items: CorporationShopItem[] = saleInfoData.value.map(getRoverShopItem)

initializeShop(items)
</script>
