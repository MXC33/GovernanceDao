<template lang="pug">
CorporationShop(:header-title="$t(`corporations.new-lands.titles.shop`)" :item-name="$t(`general.product`)" v-if="!isComplete")
CorporationCompletePage(v-else)
</template>

<script lang="ts" setup>
import type { CorporationShopItem } from '~~/composables/corporations/useCorporationShop'
import type { InfoBlock, InfoBlockTable } from '~~/composables/useInfoBlocks';
import type { GenericStoreSaleInfoFragment, NftFragment } from '#gql'

definePageMeta({
  middleware: 'auth',
  layout: "corporation"
})

const { t } = useI18n()

const { initializeShop, isComplete, setupPaymentForItem } = useCorporationShop()
const { execute: fetchNewLandsInfo } = useNewlandsData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchStakedTokens } = useStakeMCNFTData()
const { execute: fetchSaleInfo, data: saleInfoData } = useSaleInfoData('new-lands')


await Promise.all([
  fetchNewLandsInfo(),
  fetchTokens(),
  fetchStakedTokens(),
  fetchSaleInfo()
])


const contractInfoModel = (item: GenericStoreSaleInfoFragment): InfoBlock[] => {
  const getMetaInfo = (): InfoBlockTable | null => {
    if (item.token.tokenInfo.tier == 'apollo')
      return null
    const copyPath = "corporations.new-lands.stake.details.tile-contract"
    return {
      blockType: 'table',
      items: [{
        name: t(`${copyPath}.${item.token.tokenInfo.tier}.bonus.waste`),
        value: t(`${copyPath}.${item.token.tokenInfo.tier}.bonus.rate.waste`),
        state: 'active'
      }, {
        name: t(`${copyPath}.${item.token.tokenInfo.tier}.bonus.tech`),
        value: t(`${copyPath}.${item.token.tokenInfo.tier}.bonus.rate.tech`),
        state: 'active'
      }, {
        name: t(`${copyPath}.${item.token.tokenInfo.tier}.bonus.industry`),
        value: t(`${copyPath}.${item.token.tokenInfo.tier}.bonus.rate.industry`),
        state: 'active'
      }]
    }
  }

  return ([
    {
      blockType: 'header',
      items: [{
        name: 'District',
        value: DistrictRingNameMap[item.token.tokenInfo.tier]
      }, {
        name: t(`general.price`),
        value: t(`${item.price} ${item.displayPrice}`),
        state: 'accent'
      }, {
        name: 'Corp',
        value: 'Newlands'
      }, {
        name: 'Items Owned: ',
        valueType: 'tokenBalance',
        oneColumn: true
      }]
    },
    {
      blockType: 'description',
      title: t(`general.description`),
      body: t(`corporations.new-lands.stake.shopDescription`),
    },
    {
      blockType: 'description',
      title: 'staking description',
      body: t(`corporations.new-lands.stake.details.tile-contract.${item.token.tokenInfo.tier}.staking-description`),
      metaInfo: getMetaInfo()
    },
    {
      blockType: 'details',
      title: 'CONTRACT DETAILS',
      sections: [
        {
          items: [{
            name: 'Contract',
            value: item.token.tokenInfo.tier
          }, {
            name: 'District',
            value: DistrictRingNameMap[item.token.tokenInfo.tier]
          },
          {
            name: 'Total Tiles',
            value: t(`corporations.new-lands.stake.details.tile-contract.${item.token.tokenInfo.tier}.total-tiles`)
          },
          {
            name: 'Tile IDs',
            value: t(`corporations.new-lands.stake.details.tile-contract.${item.token.tokenInfo.tier}.tile-ids`)
          },
          {
            name: 'Tile Usage',
            value: 'Waste/Tech/Industry'
          },
          {
            name: 'Price Class',
            value: "1"
          },
          {
            name: 'Rent Fee Per Tile',
            value: "1 AGOLD/MONTH"
          },
          {
            name: "Staking Period",
            value: "30 Days"
          }
          ]
        }
      ]
    },
    {
      blockType: 'attributes',
      title: 'Attributes',
      items: item.token.tokenInfo.attributes.map((item) => ({
        name: item.traitType,
        value: item.value
      }))
    }

  ])
}


const getNewLandsShopItem = (item: GenericStoreSaleInfoFragment): CorporationShopItem => ({
  ...item,
  payment: setupPaymentForItem(item),
  infoBlocks: contractInfoModel(item)
})


const items: CorporationShopItem[] = saleInfoData.value.map(item => getNewLandsShopItem(item))

initializeShop(items)


</script>