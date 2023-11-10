<template lang="pug">
Line(:options="chartOptions" :data="chartData")
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import { subDays, eachDayOfInterval, format } from 'date-fns'

const today = new Date();

// Calculate the date 7 days ago
const sevenDaysAgo = computed(() => subDays(today, 6))

// Create an array of dates from 7 days ago to today
const dateInterval = computed(() => eachDayOfInterval({
  start: sevenDaysAgo.value,
  end: today
}))

const formattedDatesArray = computed(() => dateInterval.value.map(date => format(date, 'yyyy-MM-dd')))

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
    labels: formattedDatesArray.value,
    datasets: [{ data: data }]
  }
})

const chartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
}

</script>