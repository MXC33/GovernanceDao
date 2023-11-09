<template lang="pug">
Line(:options="chartOptions" :data="chartData")
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

ChartJS.defaults.backgroundColor = 'transparent';
ChartJS.defaults.borderColor = '#84D4BC';
ChartJS.defaults.color = '#fff';

const { data } = defineProps<{
  data: number[]
}>()

console.log("chart data", data)

const chartData = computed(() => {
  return {
    labels: data.map(item => ""),
    datasets: [{ data: data }]
  }
})

const chartOptions = {
  responsive: true
}

</script>