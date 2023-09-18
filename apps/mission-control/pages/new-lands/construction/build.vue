<template lang="pug">
CorporationComplete(v-if="isComplete")
CorporationOrders(v-else :media-block="slideShowBlock" :intro-tokens="tokens" :output-token="{type: 'facility'}" :show-probabilities="true")

</template>
<script lang="ts" setup>
import type { InfoBlockSlideshow } from '~/composables/useInfoBlocks';
import type { TokenTypeTier } from '~/composables/useTokenInfo';

definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

const { selectOrderCorporation, isComplete } = useCorporationOrders()
const { execute: fetchPlayerBaseLevel } = usePlayerBaseLevelData()

await fetchPlayerBaseLevel()

const { execute: fetchNewLandsInfo } = useNewlandsData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchBaseLevelCapacity } = useBaseLevelCapacityData()

const tiers: string[] = ['outlier', 'common', 'uncommon', 'rare', 'legendary']

const tokens: TokenTypeTier[] = tiers.map((tier) => ({
  type: 'facility', tier
}))

const { data: facilities, execute: fecthFacilities } = useTokenInfoTypeTier(tokens)

await Promise.all([
  fetchNewLandsInfo(),
  fetchTokens(),
  fetchBaseLevelCapacity(),
  fecthFacilities()
])
const newlands = useNewlandsCraft()
selectOrderCorporation(newlands, { type: 'new-lands', task: 'craft' })


const slideShowBlock: InfoBlockSlideshow = {
  blockType: 'slideshow',
  items: facilities.value
}


</script>
