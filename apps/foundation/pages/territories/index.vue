<template lang="pug">
Page()
  HList(grid="~ gap-6")
    router-link(to="/" tag="button" btn="~ secondary") Home
    router-link(to="/metashare" tag="button" btn="~ secondary") Metashare Staking
    router-link(to="/energy" tag="button" btn="~ secondary") Energy Staking
    router-link(to="/landmarks" tag="button" btn="~ secondary") Landmarks Staking
    router-link(to="/governance" tag="button" btn="~ secondary") Governance 
  PageSection(section="yourTerritories")
  PageSection(section="territoryStaking")
  HList()
    button(btn="~ secondary" grid="~" p="6") AREA
    button(btn="~ secondary" grid="~" p="6") SECTOR
    button(btn="~ secondary" grid="~" p="6") ZONE
    button(btn="~ secondary" grid="~" p="6") DOMAIN
  HList(w="fit")
    div(grid="~ cols-2 gap-4")
      Territory(category="Legendary")
      Territory(category="Rare")
      Territory(category="Uncommon")
      Territory(category="Common")
      Territory(category="Outliners")

  div()
    PageSection(section="yourTerritories")
  HList()
    MetashareClaimHorizontal()
  Card()

  
  
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