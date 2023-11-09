<template lang="pug">
Bar(:options="chartOptions" :data="chartData")
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'

const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }]
}
const chartOptions = {
  responsive: true
}

</script>