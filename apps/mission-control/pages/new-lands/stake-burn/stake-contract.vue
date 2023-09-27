<template lang="pug">
ClientOnly()
  CorporationStake(:items="contractItems", stake-type="tile-contract" @stake="onStakeContract")
</template>

<script lang="ts" setup>
import type { CorporationStakeItem } from '~~/composables/corporations/useCorporationStake';
import type { InfoBlock } from '~~/composables/useInfoBlocks';
const { tokenOwnedState } = useMaybeStakedTokenState()

const { t } = useI18n()
const { execute: fetchNewLandsInfo } = useNewlandsData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchStakedMCNFTData, data: stakedMCNFTData } = useStakeMCNFTData()
const { stakeOrUnstake } = useStakeMCNFT()
const { proposedStakeItems, proposedItemsAction, gotoCompleted } = useCorporationStake()

await Promise.all([
  fetchNewLandsInfo(),
  fetchTokens(),
  fetchStakedMCNFTData(),
])

const onStakeContract = async () => {

  const action = proposedItemsAction.value
  const didStake = await stakeOrUnstake(proposedStakeItems.value)

  if (didStake)
    gotoCompleted(action)
}

const allowedTiers: string[] = ['apollo', 'artemis', 'helios', 'chronos']

const getInfoBlocks = (item: CorporationStakeItem): InfoBlock[] => {
  const state = tokenOwnedState(item.token)
  const stakeStatus = (() => {
    switch (state) {
      case 'staked': return t(`corporations.new-lands.stake.detail-titles.staked`)
      case 'pending': t(`corporations.new-lands.stake.detail-titles.pending`)
      case 'not-owned': return 'N/A'
      case 'owned': return 'UNSTAKED'
    }
  })()

  return [
    {
      blockType: 'header',
      items: [{
        name: t(`general.status`),
        value: stakeStatus,
        state: state == 'staked' ? 'active' : 'disabled'
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
      blockType: 'attributes',
      title: t(`general.attributes`),
      tokenAttributes: true
    }
  ]
}

const contractItems = computed<CorporationStakeItem[]>(() => {
  return stakedMCNFTData.value.map((item) => ({
    ...item,
    staked: item.amount > 0 ? true : false,
    description: `District: ${ContractDistrictMap[item.token.tokenId]}`,
  })).filter((item) => allowedTiers.includes(item.token.tokenInfo.tier)).map((item) => ({
    ...item,
    infoBlocks: getInfoBlocks(item)
  }))
})




definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})
</script>
