<template lang="pug">
ClientOnly
  CorporationItemsAndDetail(list-title="Product" v-model="activeBurnItem" :list="items" detail-title="" :header="$t(`general.burn-assets`)" pt="3")
    template(#noItems v-if="items.length == 0")
      HelperWarning(bg="white opacity-10" v-if="corporation != 'gws'") {{ $t(`general.no-burn-items`) }}
      HelperWarning(bg="black opacity-10" v-else) {{ $t(`general.no-burn-items`) }}


    template(#list v-else)
      CorporationItemsAndDetailListItem(:item="item.token" v-for="(item, index) in items" mb="3" @click="onClickItem(item)" :is-selected="isSelected(item.token)" :img-object="'cover'")
        HList(space-x="1") 
          div {{ $t(`general.inventory`) }}
          TokenBalance(:token="item.token")
        TitleWithIcon(icon="cut-corner" fill="$corporation-text-color") {{ $t(`general.stand-by`) }}


    template(#cartRight)
      CorporationCartRow(pos="sticky-bottom 0")
        VList(items="center" justify="center" uppercase="~") 
          div {{ $t(`general.qty-colon`) }} 1

        ButtonSound(grid="col-span-1" sound="sm" btn="~ accent-filled on-disable:disable" @click="onClickBurn" :disable="isAvatarBurned") 
          | {{ isAvatarBurned ? 'Already burned' : $t('general.burn')  }}
      

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';
import type { InfoBlock, InfoBlockTable, TokenWithInfoBlocks } from '~~/composables/useInfoBlocks';
const { isSameNFT } = useNFTs()

const { t } = useI18n()
const corporation = useActiveCorporation()
const { activeBurnItem, canBurnInCorporation, onClickBurn } = useCorporationBurn()
const { data: isAvatarBurned, refresh: refreshBurnedInfo } = useAvatarBurnedData(corporation.value)

await refreshBurnedInfo()

const props = defineProps<{
  availableTokens: NftFragment[]
}>()

const isSelected = (item: NftFragment) => {
  return isSameNFT(item, activeBurnItem.value?.token)
}

const onClickItem = (item: TokenWithInfoBlocks) => {
  activeBurnItem.value = item
}
// console.log(props.availableTokens)

const items = computed(() =>
  canBurnInCorporation(props.availableTokens, corporation.value)
    .map((item) => ({
      token: item,
      infoBlocks: infoBlocks(item)
    }))
)

const infoBlocks = (item: NftFragment): InfoBlock[] => {
  const nameNoSpace = item.tokenInfo.title.replace(/\s/g, '').toLowerCase()

  const getMetaInfo = (): InfoBlockTable | null => {
    return {
      blockType: 'table',
      items: [{
        name: 'Function:',
        value: `Enable ${corporation.value} Claim All`,
        oneColumn: true,
        state: 'active'
      }]
    }
  }

  return [
    {
      blockType: 'header',
      items: [{
        name: t(`${corporation.value}`),
        value: `AVATAR`,
        oneColumn: true
      }]
    },
    {
      blockType: 'description',
      title: 'Backstory',
      body: t(`corporations.avatar-backstory.${corporation.value}.${nameNoSpace}`)
    },
    {
      blockType: 'description',
      title: 'Burning Description',
      body: t(`corporations.burn.description.${corporation.value}`, { string: item.tokenInfo.title.toLocaleUpperCase() }),
      metaInfo: getMetaInfo(),
    },
    {
      blockType: 'attributes',
      title: 'Attributes',
      items: item.tokenInfo.attributes.map((item) => ({
        name: item.traitType,
        value: item.value
      }))
    }
  ]
}


</script>
