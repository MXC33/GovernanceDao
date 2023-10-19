<template lang="pug">
Card(style="padding: 10px; border-radius: 8px;")
  HList(flex flex-row justify-between space-x="10")
    TitleDetail()
      template(#detail)
        PageParagraphs(section="yourTerritories.totalRewards")
      p [Api Data]
    button(btn="~ secondary" disable="active")
      PageParagraphs(section="claimBtn")
  </template>
  

<script lang="ts" setup>

</script>
