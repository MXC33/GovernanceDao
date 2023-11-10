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

const { data, facilities } = defineProps<{
  data: { x: number, y: number }[]
  facilities: number
}>()



const { poolShare } = useChartData()

const circlePosition = { x: 100000, y: poolShare(facilities) * 100 };

const chartData = computed(() => {
  return {
    datasets: [
      {
        data: data
      },
      {
        data: [circlePosition], // Data for the circle
        type: 'bubble', // Use 'bubble' type to represent the point as a circle
        backgroundColor: 'red', // Customize circle color
        borderColor: 'red',
        borderWidth: 1,
        radius: 5, // Adjust the size of the circle
        hoverRadius: 7,
        pointStyle: 'circle' // Ensure it's rendered as a circle
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      type: 'linear', // Set the x-axis to be a linear scale
      position: 'bottom',
      title: {
        display: true,
        text: "Facilities Minted"
      }
    },
    y: {
      type: 'linear', // Set the y-axis to be a linear scale
      title: {
        display: true,
        text: "Total share of staking pool distributed"
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>