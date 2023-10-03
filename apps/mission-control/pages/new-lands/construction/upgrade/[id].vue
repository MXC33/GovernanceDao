<template lang="pug">
CorporationOrders(:media-block="slideshowBlock" :blocks="blocks" :output-token="{type: 'facility', tier}" v-if="!isComplete")
  template(#confirmButton) {{ $t('general.confirm') }}

CorporationComplete(v-else)

</template>
  

<script lang="ts" setup>
import type { InfoBlock, InfoBlockItemState, InfoBlockSlideshow } from '~/composables/useInfoBlocks';
import type { NftFragment } from '#gql';

definePageMeta({
  layout: 'corporation'
})

const { selectUpgradeFacility, orderData, setOutcomeTokens } = useFacilityUpgrade()
const { selectOrderCorporation, isComplete, infoOutputBlocks, hasMinimumReqRecipeItems } = useCorporationOrders()


const tokens = computed<NftFragment[]>(() => ([
  possibleOutcome.value,
  defaultOutcome.value
]))

const slideshowBlock = computed<InfoBlockSlideshow>(() => ({
  blockType: 'slideshow',
  items: tokens.value,
  forceImage: true
}))

const metRequirements = computed(() => {
  if (hasMinimumReqRecipeItems.value)
    return {
      text: 'complete',
      state: 'success' as InfoBlockItemState
    }
  return {
    text: 'Insufficient',
    state: 'error' as InfoBlockItemState
  }
})

const blocks = computed<InfoBlock[]>(() => ([
  {
    blockType: 'description',
    title: 'summary',
    metaInfo: {
      blockType: 'table',
      items: [
        {
          name: 'RESOURCE REQUIREMENT',
          value: metRequirements.value.text,
          valueState: metRequirements.value.state
        },
        ...infoOutputBlocks.value,
        {
          name: 'Upgrade timeframe',
          value: '7 days',
          valueState: 'accent'
        },

        {
          name: 'Cooldown time',
          value: '7 days',
          valueState: 'accent'
        }
      ]
    }
  }
]))

const route = useRoute()
const tokenId = Number(route.params.id)
const tier = FacilityTierMap[tokenId]

const { data: token, execute: fetchToken } = useTokenInfo(tokenId)

const { execute: fetchPlayerBaseLevel } = usePlayerBaseLevelData()

await fetchPlayerBaseLevel()

const { execute: fetchUpgradeData } = useFacilityUpgradeData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchBaseLevelCapacity } = useBaseLevelCapacityData()

await Promise.all([
  fetchToken(),
  fetchUpgradeData(),
  fetchTokens(),
  fetchBaseLevelCapacity()
])

console.log("TOKEN", token.value)

selectUpgradeFacility(token.value)

const { execute: fetchPossible, data: possibleOutcome } = useTokenInfo(FacilityTokenIdMap[tier][3])
const { execute: fetchDefault, data: defaultOutcome } = useTokenInfo(FacilityTokenIdMap[tier][2])
await Promise.all([fetchPossible(), fetchDefault()])

setOutcomeTokens(defaultOutcome.value, possibleOutcome.value)


selectOrderCorporation(orderData, { type: 'new-lands', task: 'upgrade' }, [{
  ...addAdjustableToToken(token.value, { min: 1 }),
  adjustable: false
}])

</script>
  