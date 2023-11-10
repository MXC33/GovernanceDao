<template lang="pug">
div(py="3" text="xl" color="white")
  Vue3Marquee()
    div() AREA 
    div(v-for="(item, index) in area" px="3")
      div() {{ item.item }}

    div() SECTOR 
    div(v-for="(item, index) in area" px="3")
      div() {{ item.item }}

    div() ZONE 
    div(v-for="(item, index) in area" px="3")
      div() {{ item.item }}

    div() DOMAIN 
    div(v-for="(item, index) in area" px="3")
      div() {{ item.item }}


    //- div(v-for="(item, index) in data.items" px="3")
    //-   span() {{ item.text }}

  </template>
      
<script lang="ts" setup>
import { Vue3Marquee } from 'vue3-marquee'
const { territoryRewardPerDay, } = useStakingPools()



const tiers = ['outlier', 'common', 'uncommon', 'rare', 'legendary']

const area = territoryRewardPerDay('area').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})


const sector = territoryRewardPerDay('sector').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})

const zoneData = territoryRewardPerDay('zone').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})

const domainData = territoryRewardPerDay('domain').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})


</script>
  
<style>
.marquee {

  will-change: auto;
  scroll-behavior: smooth;
  backface-visibility: hidden;
}
</style>