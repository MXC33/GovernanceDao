<template lang="pug">
VList(bg="gray-800" w="xl" flex-center="~")
  div(grid="~ col" b="solid red 1")
    h4(text="3xl") Trade
  div(grid="~ row" p="6")
    p Share: [0]
    p IXT per share 30 days
    button(btn="secondary") VIEW ON MARKETPLACE

  div(grid="~ col" b="solid purple 1")
    h4(text="3xl") Staking
  CorporationBoxList(p="6")
</template>

<script lang="ts" setup>

</script>