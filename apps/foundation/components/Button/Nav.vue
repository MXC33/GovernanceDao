<template lang="pug">
Card(flex-grow="1")
  div(grid="~ cols-6 gap-6 ")
    ButtonGlitch(@click="navigateTo('/')" tag="button" btn="~ form" text="Home" font="bold")
    ButtonGlitch(@click="navigateTo('/territories')" tag="button" btn="~ form" text="Territories Staking" font="bold") 

    ButtonGlitch(@click="navigateTo('/landmarks')" tag="button" btn="~ form" text="Landmark Staking" font="bold") 
    ButtonGlitch(@click="navigateTo('/metashare')" tag="button" btn="~ form" text="Metashare Staking" font="bold") 
    ButtonGlitch(@click="navigateTo('/energy')" tag="button" btn="~ form" text="Energy Staking" font="bold") 
    ButtonGlitch(@click="navigateTo('/Governance')" tag="button" btn="~ form" text="Governance" font="bold")   
    ButtonGlitch(@click="navigateTo('/IxtCatRaff')" tag="button" btn="~ form" text="Cat Raff" font="bold")   
</template>

<script lang="ts" setup>

</script>