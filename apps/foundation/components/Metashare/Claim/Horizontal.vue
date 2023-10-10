<template lang="pug">
Card()
  HList()
    TitleDetail()
      template(#detail) Claim rewards
      template(#default) Rewards: [dynamic value]
    button(btn="~ primary-outline" disable="active") CLAIM REWARDS
</template>

<script lang="ts" setup>

</script>