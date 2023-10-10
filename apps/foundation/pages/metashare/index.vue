<template lang="pug">
Page()
  HList(grid="~ gap-6")
    router-link(to="/" tag="button" btn="~ secondary") Home
    router-link(to="/territories" tag="button" btn="~ secondary") Territories Staking
    router-link(to="/energy" tag="button" btn="~ secondary") Energy Staking
    router-link(to="/landmarks" tag="button" btn="~ secondary") Landmarks Staking
    router-link(to="/governance" tag="button" btn="~ secondary") Governance 
  TitleDetail()
    PageSection(section="staking" :primary="true")
      div(grid="~ cols-2 gap-6")
        MetashareCorporation()
        MetashareCorporation()
        MetashareCorporation()
        MetashareCorporation()


</template>

<script lang="ts" setup>

</script>

<style>
.DIVENSMORSA {
  margin: 24px 0px;
  display: flex;
  gap: 48px 24px;
  flex-wrap: wrap;
}
</style>