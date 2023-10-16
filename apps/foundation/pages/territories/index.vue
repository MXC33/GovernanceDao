<template lang="pug">
Page()
  HList(grid="~ gap-6")
    router-link(to="/" tag="button" btn="~ secondary") Home
    router-link(to="/metashare" tag="button" btn="~ secondary") Metashare Staking
    router-link(to="/energy" tag="button" btn="~ secondary") Energy Staking
    router-link(to="/landmarks" tag="button" btn="~ secondary") Landmarks Staking
    router-link(to="/governance" tag="button" btn="~ secondary") Governance 
  PageSection(section="yourTerritories")
  HList(space-x="12")
    button(btn="~ form" p="6") AREA
    button(btn="~ form" p="6") SECTOR
    button(btn="~ form" p="6") ZONE
    button(btn="~ form" p="6") DOMAIN
  HList(w="fit")
    div(grid="~ cols-2 gap-6")
      Territory(category="Legendary")
      Territory(category="Rare")
      Territory(category="Uncommon")
      Territory(category="Common")
      Territory(category="Outliners")
  div(space-y="12")
    PageSection(section="yourTerritories")
    HList()
      Card()
        p() earnings per day 
        p() earnings 7 days
      ClaimHorizontal()
  HList(space-x="12")
    button(btn="~ form" p="6") AREA
    button(btn="~ form" p="6") SECTOR
    button(btn="~ form" p="6") ZONE
    button(btn="~ form" p="6") DOMAIN
  Card(bg="default" b="none") 
  
</template>
    
<script lang="ts" setup>

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
