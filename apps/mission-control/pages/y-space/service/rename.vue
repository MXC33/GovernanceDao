<template lang="pug">
CorporationYSpaceRename(v-if="!isComplete")
CorporationComplete(v-else)
</template>
  
<script lang="ts" setup>
import type { NftFragment } from '#gql';
import type { TokenWithInfoBlocks } from '~~/composables/useInfoBlocks';

const { corporationRouteI18n } = useCorporationRoute()
const { availableItems, isComplete } = useCorporationRename()
const { fetchAllCurrencies } = useCurrencyData()

const { execute: fetchRovers, data: rovers } = useRoverData()

await Promise.all([fetchRovers(), fetchAllCurrencies()])

const { t } = useI18n()

const addInfoBlock = (token: NftFragment): TokenWithInfoBlocks => ({
  token,
  infoBlocks: [
    {
      blockType: 'header',
      items: [{
        name: 'Id: ',
        value: token.tokenId.toString(),
        oneColumn: true
      }, {
        name: 'Status: ',
        value: !isDefaultRoverName(token.tokenInfo?.title) ? 'Customized' : 'Default',
      }, {
        name: 'Service Cost: ',
        value: '1000 AC / 25 IXT',
      }]
    },
    {
      blockType: 'description',
      title: t(`corporations.${corporationRouteI18n.value}.customize.title`),
      body: t(`corporations.${corporationRouteI18n.value}.customize.description`),
    },
    {
      blockType: 'details',
      title: t(`corporations.${corporationRouteI18n.value}.customize.service-fee`),
      sections: [
        {
          items: [{
            name: t(`corporations.${corporationRouteI18n.value}.customize.details.name`),
            value: t(`corporations.${corporationRouteI18n.value}.customize.details.value`)
          }]
        }
      ]
    },
    {
      blockType: 'description',
      title: t(`general.disclaimer`),
      body: t(`corporations.${corporationRouteI18n.value}.customize.disclaimer`)
    }
  ]
})

availableItems.value = rovers.value.map(addInfoBlock)

definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

</script>