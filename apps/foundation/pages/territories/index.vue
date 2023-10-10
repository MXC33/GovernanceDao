<template lang="pug">
div()
  HeaderTitle(:index="0")
div()
  HeaderTitle(:index="11")
HList()
  button(btn="~ secondary" grid="~" p="6") AREA
  button(btn="secondary" grid="~" p="6") SECTOR
  button(btn="secondary" grid="~" p="6") ZONE
  button(btn="secondary" grid="~" p="6") DOMAIN
div(class="wrapper")
  Territory(category="Legendary")
  Territory(category="Rare")
  Territory(category="Uncommon")
  Territory(category="Common")
  Territory(category="Outliners")

div()
  HeaderTitle(m="10" :index="3")
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