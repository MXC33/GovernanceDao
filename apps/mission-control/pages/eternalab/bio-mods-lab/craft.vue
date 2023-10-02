<template lang="pug">
CorporationComplete(v-if="isComplete")
CorporationOrders(:media-block="slideshowBlock" :output-token="{type: 'biomod'}" :show-probabilities="true" v-else)
</template>
  
<script lang="ts" setup>
import type { InfoBlockSlideshow } from '~/composables/useInfoBlocks';
import type { TokenTypeTier } from '~/composables/useTokenInfo';

definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

const tiers: string[] = ['outlier', 'common', 'uncommon', 'rare', 'legendary']
const tokenDescriptors: TokenTypeTier[] = [
  ...tiers.map((tier) => ({ type: 'biomod', tier })),
  { type: 'blueprint' },
  { type: 'nothing' }
]

const { data: tokens, execute: fetch } = useTokenInfoTypeTier(tokenDescriptors)

await fetch()

const slideshowBlock: InfoBlockSlideshow = {
  blockType: 'slideshow',
  items: tokens.value,
  forceImage: true
}
const { selectOrderCorporation, isComplete } = useCorporationOrders()

const eternalab = useEternalabCraft()

const { execute: fetchPlayerBaseLevel } = usePlayerBaseLevelData()
const { execute: fetchStakedGenesis } = useStakeGenesisNFTData()

await fetchPlayerBaseLevel()
await fetchStakedGenesis()

const { execute: fetchEternaLabsInfo } = useEternalabData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchBaseLevelCapacity } = useBaseLevelCapacityData()

await Promise.all([
  fetchEternaLabsInfo(),
  fetchTokens(),
  fetchBaseLevelCapacity()
])

selectOrderCorporation(eternalab, { type: 'eternalab', task: 'craft' })

</script>
