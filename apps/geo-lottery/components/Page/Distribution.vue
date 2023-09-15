<template lang="pug">
div(flex flex-col lg:flex-row gap-y="10 lg:0")
  div(basis="5/5" items="center")
    div(space-y="3 md:4" color="ix-white" font="bold" text="lg")
      div(color="ix-white" text="3xl md:4xl xl:5xl" uppercase="~" font="bdrA3mik") AGOLD Distribution
      p() Purchased tickets are moved into various pools & burns, read more about the distribution below.

      InfoPercentWithColor(circleBG="#FF1E6E" :percent="15" info="LuckyCat Metashare")
      InfoPercentWithColor(circleBG="#FFAFCC" :percent="14" info="Territory staking")
      InfoPercentWithColor(circleBG="#FFFFFF" :percent="1" info="Astro Cap Metashare")
      InfoPercentWithColor(circleBG="#D862EB" :percent="10" info="Amelia Foundation")
      InfoPercentWithColor(circleBG="#7562EB" :percent="10" info="Burn")
      InfoPercentWithColor(circleBG="#41B2F2" :percent="12.5" info="Common prize: Country")
      InfoPercentWithColor(circleBG="#20DCBA" :percent="12.5" info="Rare prize: Country + Tier")
      InfoPercentWithColor(circleBG="#20DCBA" :percent="12.5" info="Legendary prize: Country + Tier + Territory")
      InfoPercentWithColor(circleBG="#CEF2BD" :percent="12.5" info="JACKPOT: Long/Lat + Territory")

  div(basis="5/5" flex="~ col" justify="end" items="center lg:end" w="full")
    div(w="100% sm:450px xl:550px" text-left mb="10 lg:0")
      RadialChart(:seriesChart="seriesRadial" :colorsChart="colorsRadial" :titleChart="'Price & Pool Distribution Chart'")
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
