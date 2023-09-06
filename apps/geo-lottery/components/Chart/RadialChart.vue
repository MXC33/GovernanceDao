<template lang="pug">
ClientOnly(fallback-tag="span" fallback="Price & Pool Distribution Chart")
  //apexchart(width="500" type="bar" :options="options" :series="series")
  apexchart(:options="chartRadial" :series="seriesRadial")

</template>
<script lang="ts" setup>
const chartRadial = {
  chart: {
    width: 380,
    type: 'donut',
    redrawOnWindowResize: true,
    redrawOnParentResize: true
  },
  states: {
    normal: {
      filter: {
        type: 'none',
      }
    },
    hover: {
      filter: {
        type: 'none',
      }
    },
    active: {
      filter: {
        type: 'none',
      }
    },
  },
  legend: {
    show: false,
    offsetY: 0,
    height: 0,
  },
  tooltip: {
    enabled: false,
  },
  dataLabels: {
    enabled: false,
  },
  /*colors: [ '#FF1E6E', '#FF1E6E', '#FF1E6E', '#FF1E6E', '#FF1E6E', '#FF1E6E',
    '#FFAFCC', '#FFAFCC', '#FFAFCC', '#FFAFCC', '#FFAFCC', '#FFAFCC',
    '#F9F9F9',
    '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD',
    '#20DCBA', '#20DCBA', '#20DCBA', '#20DCBA', '#20DCBA', '#20DCBA',
    '#41B2F2', '#41B2F2', '#41B2F2', '#41B2F2', '#41B2F2', '#41B2F2',
    '#7562EB', '#7562EB', '#7562EB', '#7562EB',
    '#D862EB', '#D862EB', '#D862EB', '#D862EB'],*/

  colors: colorsChart,
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'round',
    //colors: [ "#560723" ],
    colors: [ "#560723" ],
    width: 10,
    dashArray:0,
  },
};
/*const seriesRadial = [1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1]*/

const seriesRadial = seriesChart;


const { titleChart, seriesChart, colorsChart } = defineProps<{
  titleChart?: string,
  seriesChart?: Array<string>,
  colorsChart?: Array<string>
}>()
</script>
<style>
</style>
