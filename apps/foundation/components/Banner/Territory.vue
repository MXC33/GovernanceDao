<template lang="pug">
div(font="bold") AREA 
div(v-for="(item, index) in area" px="3")
  div() {{ item.item }}

div(font="bold") SECTOR 
div(v-for="(item, index) in sector" px="3")
  div() {{ item.item }}

div(font="bold") ZONE 
div(v-for="(item, index) in zone" px="3")
  div() {{ item.item }}

div(font="bold") DOMAIN 
div(v-for="(item, index) in domain" px="3")
  div() {{ item.item }}


//- div(v-for="(item, index) in data.items" px="3")
//-   span() {{ item.text }}

  </template>
      
<script lang="ts" setup>
const { territoryRewardPer30Day, } = useStakingPools()



const tiers = ['outlier', 'common', 'uncommon', 'rare', 'legendary']

const area = territoryRewardPer30Day('area').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})


const sector = territoryRewardPer30Day('sector').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})

const zone = territoryRewardPer30Day('zone').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})

const domain = territoryRewardPer30Day('domain').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})


</script>
