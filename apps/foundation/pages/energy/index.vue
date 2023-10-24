<template lang="pug">
Page()
  ButtonNav()

  PageSection(section="Staking" :primary="true")
    EnergyDashboard

  PageSection(section="ChooseYourPool")
    StakeEnergy()

  PageSection(section = "AmeliaFoundation")
    EnergyAmelia()
</template>

<script lang="ts" setup>


</script>

<style>
.imgBox {
  flex: display;
  align-items: center;
}
</style>