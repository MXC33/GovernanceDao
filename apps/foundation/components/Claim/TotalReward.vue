<template lang="pug">
Card(style="padding: 10px; border-radius: 8px;")
  HList(flex flex-row justify-between space-x="10")
    TitleDetail()
      template(#detail)
        p Total Rewards
      p [dynamic value]
    button(btn="~ secondary" disable="active") Claim
  </template>
  

<script lang="ts" setup>

</script>
