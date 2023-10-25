<template lang="pug">
CardSection(title="Claim Rewards")
  VList()
    TitleDetail()
      p Rewards: [dynamic value]
      template(#buttons)
  button(btn="~ primary-outline-cut" disable="active")  CLAIM REWARDS
</template>

<script lang="ts" setup>

</script>