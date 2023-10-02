<template lang="pug">
div(class="mainCnt")
  div(class="cntT")
    CorporationOrdersNavigationPlus
    CorporationOrdersNavigationPlus

  div(class="cntContent")
    slot

  div(class="cntB")
    CorporationOrdersNavigationPlus
    CorporationOrdersNavigationPlus
  </template>
<script lang="ts" setup>
</script>
<style>
.mainCnt {
  display: flex;
  box-sizing: border-box;
  border: 1px solid red;
}

.cntT {
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
}

.cntContent {
  display: flex;
  /* padding-left: 20px;
  padding-right: 20px; */
}

.cntB {
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
}
</style>