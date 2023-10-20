<template lang="pug">
Page()
  ButtonNav()

  PageSection(section="StakingTitle")
  HList(space-x="12")
    // Jag försökte göra denna till unik för att just nu
    // så ändrar den rendreringen av nedanstående.
    ButtonTopTerritories(v-for="section in sections" :key="section"  :label="section" @click="activeSectionTop = $event")
  TerritoryBoxes(v-if="activeSectionTop === 'area'" b="blue solid 0.5")
  TerritoryBoxes(v-if="activeSectionTop === 'sector'" b="red solid 0.5")
  TerritoryBoxes(v-if="activeSectionTop === 'zone'" b="yellow solid 0.5")
  TerritoryBoxes(v-if="activeSectionTop === 'domain'" b="purple solid 0.5")
  div(space-y="12")
    PageSection(section="TerritoryTitle")
    HList()
      CardEarnings()
      ClaimTotalReward()

  HList(space-x="12")
    ButtonTerritories(v-for="section in sections" :key="section"  :label="section" @click="activeSection = $event")
  PageSection(v-if="activeSection === 'area'" section="ContentArea")
  PageSection(v-if="activeSection === 'sector'" section="ContentSector")
  PageSection(v-if="activeSection === 'zone'" section="ContentZone")
  PageSection(v-if="activeSection === 'domain'" section="ContentDomain")

</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeSection = ref('area');
const activeSectionTop = ref('area');
const sections = ['AREA', 'SECTOR', 'ZONE', 'DOMAIN'];

</script>
  
    
<style>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-right: -30px;
  margin-bottom: -30px;
  gap: 24px;
  width: min(100%, 950px);
}
</style>
