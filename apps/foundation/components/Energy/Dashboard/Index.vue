<template lang="pug">
div(grid="~ lg:cols-2 cols-1 gap-6")
  EnergyDashboardPool(:data="data")

  VList(space-y="6")
    CardChart()

    EnergyDashboardEpochs(:data="data")

</template>
  
<script lang="ts" setup>
import type { StakingDataFragment } from '~/.nuxt/gql/default';


defineProps<{
  data: StakingDataFragment
}>()

</script>