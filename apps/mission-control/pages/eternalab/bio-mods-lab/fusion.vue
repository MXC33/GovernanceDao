<template lang="pug">
CorporationComplete(v-if="isComplete")
CorporationOrders(v-else :output-token="data" :blocks="blocks")
</template>
  
<script lang="ts" setup>
import type { InfoBlock } from '~/composables/useInfoBlocks';

definePageMeta({
  middleware: 'auth',
  layout: 'corporation'
})

const { selectOrderCorporation, isComplete } = useCorporationOrders()

const craftModel = useMetamodFusion()



const { execute: fetchMetaModFusionData } = useMetamodFusionData()
const { execute: fetchTokens } = useTokenData()
const { execute: fetchMetaMod, data } = useTokenInfo(0)

await Promise.all([
  fetchMetaModFusionData(),
  fetchTokens(),
  fetchMetaMod()
])
const orderSummary = useCorporationOrderInfoBlocks()

const blocks = computed<InfoBlock[]>(() => {
  return [
    orderSummary.value
  ]
})

selectOrderCorporation(craftModel, { type: 'eternalab', task: 'fusion' })

</script>
