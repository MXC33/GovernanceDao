<template lang="pug">
div(grid="~ lg:cols-2 cols-1 gap-6")
  EnergyDashboardPool()

  VList(space-y="6")
    CardChart()

    EnergyDashboardEpochs()

</template>
  
<script lang="ts" setup>
</script>