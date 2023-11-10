<template lang="pug">
Card()
  slot(name="title")


  Chart(:data="data" :x-label="xLabel" :y-label="yLabel")

  HList(space-x="6")
    slot(name="details")

</template>

<script lang="ts" setup>
import type { ChartInfo } from 'composables/useChartData';


defineProps<{
  data: ChartInfo
  xLabel?: string
  yLabel?: string
}>()


</script>