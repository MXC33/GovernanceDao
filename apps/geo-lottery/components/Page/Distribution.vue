<template lang="pug">
div(flex flex-col lg:flex-row)
  div(basis="5/5 md:3/5" flex="~ col" justify="center items-start" w="full")
    div(max-w="450px lg:550px" text-left mb="10 lg:0")
      RadialChart(:seriesChart="seriesRadial" :colorsChart="colorsRadial" titleChart="Price & Pool Distribution Chart")

  div(basis="5/5 md:2/5" items="center")
    div(space-y="4")
      div(color="ix-white" text="4xl xl:6xl" uppercase="~" font="bdrA3mik") Price & Pool Distribution
      p(color="ix-white" font="bold" text="lg") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate, ipsum in ultricies dictum, erat diam porttitor diam, quis pharetra sapien dui et massa. Lorem ipsum.

      InfoPercentWithColor(circleBG="#FF1E6E" :percent="15" info="LuckyCat Metashare")
      InfoPercentWithColor(circleBG="#FFAFCC" :percent="14" info="Territory staking")
      InfoPercentWithColor(circleBG="#FFFFFF" :percent="1" info="Astro Cap Metashare")
      InfoPercentWithColor(circleBG="#D862EB" :percent="10" info="Amelia Foundation")
      InfoPercentWithColor(circleBG="#7562EB" :percent="10" info="Burn")
      InfoPercentWithColor(circleBG="#41B2F2" :percent="16.67" info="Common prize: Country")
      InfoPercentWithColor(circleBG="#20DCBA" :percent="16.67" info="Rare prize: Country + Tier")
      InfoPercentWithColor(circleBG="#CEF2BD" :percent="16.67" info="Jackpot prize: Country + Tier + Territory")
</template>
<script lang="ts" setup>
import RadialChart from "~/components/Chart/RadialChart.vue";
const colorsRadial = [ '#FF1E6E', '#FF1E6E', '#FF1E6E', '#FF1E6E', '#FF1E6E', '#FF1E6E',
  '#FFAFCC', '#FFAFCC', '#FFAFCC', '#FFAFCC', '#FFAFCC', '#FFAFCC',
  '#F9F9F9',
  '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD', '#CEF2BD',
  '#20DCBA', '#20DCBA', '#20DCBA', '#20DCBA', '#20DCBA', '#20DCBA',
  '#41B2F2', '#41B2F2', '#41B2F2', '#41B2F2', '#41B2F2', '#41B2F2',
  '#7562EB', '#7562EB', '#7562EB', '#7562EB',
  '#D862EB', '#D862EB', '#D862EB', '#D862EB'];

const seriesRadial = [1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1]

useHead({
  title: "Home | Geo Lottery | PlanetIX"
})

</script>
<style>
</style>
