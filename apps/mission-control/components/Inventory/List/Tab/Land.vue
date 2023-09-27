<template lang="pug">
InventoryListWrapper()
  InventoryListSubTabs(:tabs="tabs" :active-tab="activeTab" @select-tab="selectTab" pos="sticky top-0")

  InventoryListNFTs(:nfts="nfts")

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';
import { type PixNFT, TerritoryTypes } from '~~/composables/NFTs/useLand';

const { tabNFTs } = useInventory()

type TabType = 'pix' | 'territories' | 'landmark'
type TabNFT = PixNFT

const tabMap: Record<TabType, string[]> = {
  'pix': ['pix'],
  'landmark': ['landmark'],
  'territories': TerritoryTypes
}

const getNFTs = (tab: TabType) =>
  (tabNFTs.value as TabNFT[]).filter((pix: NftFragment) => {
    return tabMap[tab].includes(pix.tokenInfo.type)
  })

const tabs = computed<TabType[]>(() => {
  const tabs: TabType[] = ['pix', 'territories', 'landmark']
  return tabs.filter((tab) => getNFTs(tab).length > 0)
})


const activeTab = ref<TabType>(tabs.value[0])

const nfts = computed(() => getNFTs(activeTab.value))

const selectTab = (tab: TabType) => {
  activeTab.value = tab
}

</script>