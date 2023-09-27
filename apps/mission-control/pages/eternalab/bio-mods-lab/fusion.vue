<template lang="pug">
CorporationComplete(v-if="isComplete")
CorporationOrders(v-else :output-token="{type: 'm3ta-mod'}" :blocks="blocks")
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

await Promise.all([
  fetchMetaModFusionData(),
  fetchTokens()
])
const orderSummary = useCorporationOrderInfoBlocks()

const blocks = computed<InfoBlock[]>(() => {
  return [
    orderSummary.value
  ]
})

selectOrderCorporation(craftModel, { type: 'eternalab', task: 'fusion' })

</script>
