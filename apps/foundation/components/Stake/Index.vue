<template lang="pug">
div(grid="~ cols-2 gap-3")
  Card(v-for="box in boxes" :key="box.monthValue")
    div
      h3(text-2xl font-bold) {{ box.monthValue }} Months
      p Lock period
    div(grid grid-cols-4)
      div APY
      div 10%
      div Your Stake
      div 0
      div Pool Size
      div 0
      div Cooldown
      div 0
    VList
      Claim
  </template>
  


<script lang="ts" setup>

interface BoxData {
  monthValue: number;
  // You can add more properties here if needed
}

const boxes: BoxData[] = [
  { monthValue: 12 },
  { monthValue: 6 },
  { monthValue: 3 },
  { monthValue: 1 }
];




</script>