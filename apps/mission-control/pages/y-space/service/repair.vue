<template lang="pug">
ClientOnly
  CorporationItemsAndDetail(v-model="activeRepairItem" :list="filterItems" detail-title="" v-if="!isComplete")
    template(#tabs)
      CorporationItemsAndDetailTab(v-for="tab in tabs" @click="onClickTab(tab)" :is-selected="activeTab(tab)") {{ tab }}

    template(#noItems)
      HelperWarning(bg="white opacity-10") {{ noItemsToRepairMessage }}

    template(#list)
      CorporationYSpaceRepairItem(v-for="item in filterItems" :item="item" :is-selected="isSelected(item)" :key="item.token.tokenId" :pay-token="payToken")

    template(#afterList)
      VList(z="999" v-if="filterItems.length > 0" w="full" mb="1")
        HelperWarning(v-if="cartItemCount == 0" bg="mc-ygreen_40") {{ $t(`corporations.y-space.general-msg.warning`) }}
        HelperTimeFrame(v-else-if="cartItemCount == 1" alignment="start") {{ $t(`corporations.y-space.general-msg.ready-repair-one`) }}
        HelperTimeFrame(v-else alignment="start") {{ $t(`corporations.y-space.general-msg.ready-repair-more`) }}


    template(#cartLeft v-if="isRepairable")
      VList()
        CorporationCartRow()
          CorporationCartSelectToken(:available-tokens="payTokens", v-model="payToken" v-if="!hasStakedGenesis")
          VList(items="center" p="x-4 y-2" text="sm" justify="center" uppercase="~" bg="mc-ygreen_20" v-else)
            div Genesis staked

          HList(items="center" space-x="2" px="4" py="2" text="sm" uppercase="~")
            div(w="full") {{ $t(`general.total`) }}
            HList(text="right $mc-accent" :with-name="true" flex-grow="1" space-x="2")
              div {{ currentPrice }}
              TokenName(:is-short="true" :key="payToken.token.tokenId" :token="payToken.token")


        CorporationCartRow()
          VList(items="center" justify="center" uppercase="~") 
            div {{ cartItemCount }} {{ $t(`general.selected`) }}

          ButtonSound(grid="col-span-1" sound="sm" btn="~ accent-filled on-disable:disable" @click="onClickRepair" :disable="cartItemCount == 0") {{ $t(`general.repair`) }}

    template(#buttonBack)  {{ $t(`general.exit`) }}
  CorporationComplete(v-else)
</template>

<script lang="ts" setup>
import type { CorporationAdjustableToken } from '~~/composables/corporations/useCorporations';
import type { CorporationRepairItem } from '~~/composables/corporations/useCorporationService';
import type { NftFragment } from '#gql'
import type { InfoBlockTable } from '~~/composables/useInfoBlocks';

type Tab = 'repair' | 'pristine' | 'wrecked'
const tabs: Tab[] = ['repair', 'pristine', 'wrecked']

definePageMeta({
  layout: 'corporation'
})

const { t } = useI18n()
const { isSameNFT } = useNFTs()
const { availableItems, activeRepairItem, payToken, proposedRepairItems, hasStakedGenesis, isComplete, repairItems } = useCorporationRepair()
const { fetchAllCurrencies, astroCreditToken, ixtToken } = useCurrencyData()
const { execute: fetchRovers, data: ownedRovers } = useRoverData()
const { execute: fetchTileGroups, tileGroups } = useTileData()
const { execute: fetchStakedGenesisNFTData } = useStakeGenesisNFTData()

await Promise.all([
  fetchAllCurrencies(),
  fetchRovers(),
  fetchTileGroups(),
  fetchStakedGenesisNFTData()
])

const cartItemCount = computed(() => proposedRepairItems.value.length)

const isSelected = (item: CorporationRepairItem) =>
  isSameNFT(activeRepairItem.value.token, item.token)

type Rover = CorporationAdjustableToken

const allRovers = computed<Rover[]>(() => {
  const stakedList = tileGroups.value.map(group => group.assets.filter(item => item.tokenInfo.type == 'rover').map(item => ({ ...item, tile: group.tile }))).flat()

  const addAdjustableToken = (token: NftFragment) =>
    addAdjustableToToken(token, { min: 0 })

  const decoratedStakedList = stakedList.map(addAdjustableToken)

  const decoratedRoverList = ownedRovers.value.map(addAdjustableToken)

  return [...decoratedRoverList, ...decoratedStakedList] as Rover[]

})

const isRepairable = computed(() => selectedStatus.value == 'repair' && filterItems.value.length > 0)

const normalizeStatus = (status: string) => {
  if (['worn', 'damaged'].includes(status))
    return 'repair'
  else return status
}

const statusOfRovers = computed(() =>
  [...new Set(allRovers.value.map((item) => normalizeStatus(item.token.tokenInfo.status)))]
)

const selectedStatus = ref(statusOfRovers.value[1])

const onClickTab = (tab: Tab) => {
  selectedStatus.value = tab
  activeRepairItem.value = filterItems.value[0]
}

const onClickRepair = () =>
  repairItems()

const setTab = (tab: Tab) =>
  selectedStatus.value = tab

const activeTab = (tab: Tab) =>
  selectedStatus.value == tab

const filterItems = computed(() =>
  availableItems.value.filter(item => normalizeStatus(item.token.tokenInfo.status) == selectedStatus.value)
)

const noItemsToRepairMessage = computed(() => {
  switch (selectedStatus.value) {
    case 'repair': return t(`corporations.y-space.general-msg.no-items-repair`)
    case 'pristine': return t(`corporations.y-space.general-msg.no-pristine-rovers`)
    case 'wrecked': return t(`corporations.y-space.general-msg.no-wrecked-rovers`)
    default: return t(`corporations.y-space.general-msg.no-items-repair`)
  }
})

const payTokens = computed(() => [astroCreditToken.value, ixtToken.value].filter(Boolean))

watch(payTokens, (tokens) => {
  payToken.value = {
    value: 0,
    fromUser: true,
    token: tokens[0]
  }
}, { immediate: true })

const currentPrice = computed(() => {

  if (hasStakedGenesis.value)
    return 0

  const statuses = proposedRepairItems.value.map(item => item.token.tokenInfo.status)
  const acPrice = statuses.map(item => getRoverACRepairPrice(item)).reduce((a, b) => a + b, 0)
  const ixtPrice = statuses.map(item => getRoverIXTRepairPrice(item)).reduce((a, b) => a + b, 0)

  const price = payToken.value.token.tokenInfo.type == 'astro-credit' ? acPrice : ixtPrice
  proposedRepairItems.value.map(item => item.price = price)
  return price ?? 0
})


const addInfoBlock = (item: CorporationRepairItem): CorporationRepairItem => {

  const getMetaInfo = (): InfoBlockTable | null => {

    return {
      blockType: 'table',
      items: [{
        name: 'Decline 1 Step',
        value: '50%',
        state: 'active'
      }, {
        name: 'Decline 2 Steps',
        value: '0.1%',
        state: 'active',
      }]
    }
  }

  return {
    ...item,
    infoBlocks: [
      {
        blockType: 'header',

        items: [{
          name: 'Id: ',
          value: item.token.tokenId.toString(),
          oneColumn: true
        }, {
          name: 'Status',
          value: item.token.tokenInfo?.status,
        }]
      },
      {
        blockType: 'description',
        title: t(`corporations.y-space.repair-details.title`),
        body: t(`corporations.y-space.repair-details.description`),
        metaInfo: getMetaInfo()
      },
      {
        blockType: 'details',
        title: 'Performance Details',
        sections: [
          {
            items: [{
              name: 'Pristine',
              value: '100% Output'
            }, {
              name: 'Worn',
              value: '90% Output'
            }, {
              name: 'Damaged',
              value: '60% Output'
            }, {
              name: 'Wrecked',
              value: '0% Output'
            }]
          }
        ]
      },
      {
        blockType: 'attributes',
        title: 'Attributes',
        tokenAttributes: true
      }
    ]
  }
}

// availableItems.value = allRovers.value.map(addInfoBlock)

onBeforeMount(() => {
  availableItems.value = allRovers.value.map(addInfoBlock)
  setTab('repair')
})

</script>