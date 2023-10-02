<template lang="pug">
CorporationStake(stake-type="genesis" :items="renderItems" @stake="onStake")
</template>


<script setup lang="ts">

import type { CorporationStakeItem } from '~~/composables/corporations/useCorporationStake';
import type { InfoBlockTable } from '~~/composables/useInfoBlocks';
const { t } = useI18n()
const { corporationRouteI18n } = useCorporationRoute()


const { proposedStakeItems, gotoCompleted } = useCorporationStake()

const { execute: fetchTokens } = useTokenData()
const { execute: fetchEthNFTs } = useEthNFTData()
const { execute: fetchStakedGenesisNFTData, data: stakedItems } = useStakeGenesisNFTData()
const { execute: fetchStakedGenesisNFTEthData, data: stakedEthItems } = useStakeGenesisNFTEthData()

const { balanceOfToken } = useUserData()

const corporation = useActiveCorporation()

await Promise.all([
  fetchTokens(),
  fetchEthNFTs(),
  fetchStakedGenesisNFTData(),
  fetchStakedGenesisNFTEthData()
])

const stakeToken = computed(() =>
  CorporationGenesisMap[corporation.value]
)

const lockedEthItems = computed(() =>
  stakedEthItems.value
    .filter(item => item.token.tokenId == stakeToken.value).map(a => a.lockedAt)
)

console.log("Data", stakedItems.value, stakedEthItems.value)

const { stakeOrUnstake: stakeOrUnstakeGenesis } = useStakeMCGenesisNFT()

const onStake = async () => {
  const staked = await stakeOrUnstakeGenesis(proposedStakeItems.value)
  const isUnstake = !!proposedStakeItems.value.find((item) => item.state == 'unstake')

  if (staked)
    gotoCompleted(isUnstake ? 'unstake' : 'stake')
}


const getMetaInfo = (): InfoBlockTable | null => {
  return {
    blockType: 'table',
    items: [{
      name: 'Function:',
      value: t(`corporations.${corporationRouteI18n.value}.function`),
      oneColumn: true,
      state: 'active'
    }]
  }
}

console.log("STAKE", stakedItems.value)

const renderItems = computed<CorporationStakeItem[]>(() =>
  stakedItems.value
    .filter(item => item.token.tokenId == stakeToken.value)
    .map((item) => ({
      ...item,
      staked: item.amount > 0 || lockedEthItems.value[0] > 0 ? true : false,
      lockedAt: lockedEthItems.value[0],
      description: `Inventory: ${balanceOfToken(item.token) ?? 0}`,
      infoBlocks: [
        {
          blockType: 'header',
          items: [{
            name: 'Corp',
            value: t(`corporations.${corporation.value}.corpo`)
          }, {
            name: 'Items Owned',
            valueType: 'tokenBalance',
            oneColumn: true
          }]
        },
        {
          blockType: 'description',
          title: t(`general.description`),
          body: t(`corporations.${corporationRouteI18n.value}.description`),
        },
        {
          blockType: 'description',
          title: t(`general.staking-description`),
          body: t(`corporations.${corporationRouteI18n.value}.staking-description`),
          metaInfo: getMetaInfo(),
        }
      ]
    })
    )
)

</script>