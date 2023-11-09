<template lang="pug">
div(grid="~ lg:cols-2 cols-1 gap-4 lg:gap-6")
  EnergyDashboardPool(:data="data")

  CardChart()

  EnergyDashboardEpochs(:data="data")

</template>
  
<script lang="ts" setup>
import type { StakingDataFragment } from '~/.nuxt/gql/default';


defineProps<{
  data: StakingDataFragment
}>()

</script>