<template lang="pug">
Line(:options="chartOptions" :data="chartData" v-if="chartOptions" ref="chart")
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
  Filler,
  type ChartOptions,
  type ChartData,
  type ScriptableContext
} from 'chart.js'

import type { ChartInfo, ChartListData } from 'composables/useChartData';
const chart = ref()

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

ChartJS.defaults.borderColor = '#84D4BC';
ChartJS.defaults.color = '#fff';
const Colors = {
  grid: '#333',
  backgroundFrom: "rgba(131,212,188,0.4)",
  backgroundTo: "rgba(131,212,188,0.0)",
  ticks: 'rgba(255,255,255,0.4)'
}

const { data, xLabel, ylabel } = defineProps<{
  data: ChartInfo
  xLabel?: string
  ylabel?: string
}>()

const chartData = computed<ChartData<'line'>>(() => {
  return {
    labels: (data as ChartListData)?.labels,
    datasets: [{
      data: data.data,
      fill: true,
      backgroundColor: (context: ScriptableContext<'line'>) => {
        const chartArea = context.chart.chartArea;
        if (!chartArea)
          return
        const gradient = context.chart.ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        console.log("Got the grad")
        gradient.addColorStop(1, Colors.backgroundFrom);
        gradient.addColorStop(0, Colors.backgroundTo);
        return gradient;
      },
    }],

  }
})

const chartOptions: ChartOptions<"line"> = {
  responsive: true,

  scales: {
    x: {
      type: data.type == 'xy' ? 'linear' : 'category',
      position: 'bottom',
      grid: {
        color: Colors.grid
      },
      ticks: {
        color: Colors.ticks
      },
      title: {
        display: true,
        text: xLabel
      }
    },
    y: {
      type: 'linear',
      grid: {
        color: Colors.grid
      },
      ticks: {
        color: Colors.ticks
      },
      title: {
        display: true,
        text: ylabel
      }
    }
  },
  plugins: {
    filler: {
      propagate: true,
    },
    legend: {
      display: false
    }
  }
}

</script>