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
  Legend,
  type ChartOptions
} from 'chart.js'
import type { ChartInfo } from 'composables/useChartData';

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

const { data, xLabel, ylabel } = defineProps<{
  data: ChartInfo
  xLabel?: string
  ylabel?: string
}>()


const chartData = computed(() => {
  return {
    labels: data.labels,
    datasets: [{ data: data.data }]
  }
})

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: xLabel
      }
    },
    y: {
      title: {
        display: true,
        text: ylabel
      },
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

</script>