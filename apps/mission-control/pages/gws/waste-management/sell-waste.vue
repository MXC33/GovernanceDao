<template lang="pug">
CorporationComplete(v-if="isComplete")
CorporationOrders(id="gws", :output-token="astroCredit" :blocks="blocks" v-else)
</template>
  
<script lang="ts" setup>
import type { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract';
import type { InfoBlock } from '~/composables/useInfoBlocks';


definePageMeta({
  layout: 'corporation'
})

const { execute: fetchPlayerBaseLevel } = usePlayerBaseLevelData()

await fetchPlayerBaseLevel()

const { execute: fetchGWS } = useGWSData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchBaseLevelCapacity } = useBaseLevelCapacityData()
const { execute: fetchAstroCredit, data: astroCredit } = useTokenInfo(8)

await Promise.all([
  fetchGWS(),
  fetchTokens(),
  fetchBaseLevelCapacity(),
  fetchAstroCredit()
])

const { selectOrderCorporation, isComplete, activeRecipe, orderAmountTaxed, orderTax } = useCorporationOrders()

const gwsCorporation = useGWSCraft()
const sellingAmount = computed(() => activeRecipe.value[0].value)
const id: CorporationOrderId = { type: 'gws', task: 'fusion' }
selectOrderCorporation(gwsCorporation, id)
const orderSummary = useCorporationOrderInfoBlocks()

const blocks = computed<InfoBlock[]>(() => {
  return [
    {
      blockType: 'description',
      title: 'SELL ORDER',
      metaInfo: {
        blockType: 'table',
        items: [
          { name: 'Selling', value: String(sellingAmount.value) },
          { name: 'GWS FEE 5%', value: String(orderTax(sellingAmount.value, id)) },
          { name: 'TOTAL', value: String(orderAmountTaxed(sellingAmount.value, id)) }
        ]
      }
    },
    orderSummary.value
  ]
})
</script>