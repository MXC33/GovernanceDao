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
import annotationPlugin from 'chartjs-plugin-annotation';

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
  annotationPlugin,
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

interface CurrentPosition {
  x: number,
  y: number,
}

const { data, xLabel, ylabel, xMax, yMax, currentPosition } = defineProps<{
  data: ChartInfo
  currentPosition?: CurrentPosition,
  xLabel?: string
  ylabel?: string
  xMax?: number,
  yMax?: number
}>()

const chartData = computed<ChartData<'line'>>(() => {
  return {
    labels: (data as ChartListData)?.labels,
    datasets: [
      {
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
          gradient.addColorStop(1, Colors.backgroundFrom);
          gradient.addColorStop(0, Colors.backgroundTo);
          return gradient;
        },
      },
    ],

  }
})

const chartOptions: ChartOptions<"line"> = {
  responsive: true,

  scales: {
    x: {
      max: xMax,
      type: data.type == 'xy' ? 'linear' : 'category',
      position: 'bottom',
      grid: {
        color: Colors.grid
      },
      ticks: {
        color: Colors.ticks,
        padding: 10,
      },
      title: {
        display: !!xLabel,
        text: xLabel
      }
    },
    y: {
      type: 'linear',
      max: yMax,
      grid: {
        color: Colors.grid
      },
      ticks: {
        padding: 25,
        color: Colors.ticks
      },
      title: {
        display: !!ylabel,
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
    },
    annotation: {
      clip: false,
      annotations: {
        currentPosition: currentPosition ? {
          xValue: currentPosition.x,
          yValue: currentPosition.y,
          type: 'point',
          borderColor: 'clear',
          radius: 4,
          backgroundColor: 'rgb(255,102,71)'
        } : undefined
      }
    }

  }
}

</script>