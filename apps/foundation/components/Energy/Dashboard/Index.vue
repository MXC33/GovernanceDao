<template lang="pug">
div(grid="~ lg:cols-2 cols-1 gap-default")
  EnergyDashboardPool(:data="data")

  Card()
    Chart(:data="chartInfo" :facilities="facilities" y-label="Total share of staking pool distributed" x-label="Facilities Minted" :x-max="100000" :y-max="100" :current-position="currentPos")


  EnergyDashboardEpochs(:data="data")

</template>
  
<script lang="ts" setup>
import type { ChartInfo } from 'composables/useChartData';
import type { StakingDataFragment } from '~/.nuxt/gql/default';


defineProps<{
  data: StakingDataFragment
}>()


const { poolShare } = useChartData()


const { facilitiesMintedData } = useChartData()
const { totalFacilitiesMinted } = useEnergyData()
const { execute: fetchData, data: facilitesMinted } = totalFacilitiesMinted()
await fetchData()

const facilities = computed(() => facilitesMinted.value ?? 0)

const currentPos = computed(() => ({
  x: 100000,
  y: poolShare(facilities.value) * 100
}))
const chartData = facilitiesMintedData()
const chartInfo: ChartInfo = { data: chartData, type: 'xy' }

</script>