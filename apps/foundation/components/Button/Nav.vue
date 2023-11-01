<template lang="pug">
div(grid="~ cols-6 gap-3" mb="8" px="6")
  ButtonGlitch(@click="navigateTo('/')" btn="~ form" text="Home" font="bold")
  ButtonGlitch(@click="navigateTo('/territories')" btn="~ form" text="Territories Staking" font="bold") 

  ButtonGlitch(@click="navigateTo('/landmarks')" btn="~ form" text="Landmark Staking" font="bold") 
  ButtonGlitch(@click="navigateTo('/metashare')" btn="~ form" text="Metashare Staking" font="bold") 
  ButtonGlitch(@click="navigateTo('/energy')" btn="~ form" text="Energy Staking" font="bold") 
  ButtonGlitch(@click="navigateTo('/ixtCatRaff')" btn="~ form" text="Cat Raff" font="bold")   
</template>

<script lang="ts" setup>

</script>