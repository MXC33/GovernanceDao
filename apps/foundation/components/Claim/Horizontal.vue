<template lang="pug">
HList(flex flex-row justify-between)
  TitleDetail()
    template(#detail)
      PageParagraphs(section="claimRewards")
    template(#default) 0
      // img(src="~/assets/images/token.svg")
  button(btn="~ primary-outline" disable="active") CLAIM REWARDS 
</template>

<script lang="ts" setup>

</script>