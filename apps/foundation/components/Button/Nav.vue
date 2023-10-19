<template lang="pug">
Card(flex-grow="1")
  Div(grid="~ cols-5 gap-6 ")
    ButtonGlitch(@click="navigateTo('/territories')" tag="button" btn="~ form" text="Territories Staking" font="bold") 
    ButtonGlitch(@click="navigateTo('/energy')" tag="button" btn="~ form" text="Energy Staking" font="bold") 
    ButtonGlitch(@click="navigateTo('/landmarks')" tag="button" btn="~ form" text="Landmark Staking" font="bold") 
    ButtonGlitch(@click="navigateTo('/metashare')" tag="button" btn="~ form" text="Metashare Staking" font="bold") 
    ButtonGlitch(@click="navigateTo('/Governance')" tag="button" btn="~ form" text="Governance" font="bold")   
</template>

<script lang="ts" setup>

</script>