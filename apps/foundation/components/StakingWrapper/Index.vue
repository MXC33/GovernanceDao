<template lang="pug">
VList(bg="black" flex="~ space-x-10 items-center space-around")
  div(flex="~ cols-2 gap-12" justify-between)     
    TitleDetail()
      template(#detail)
        ul(flex="~ col space-x-4")
          li(text="xl") Total Staked:
          li(text="xl" color="white" font="bold") 0
    TitleDetail()
      template(#detail)
        ul(flex="~ col space-x-4")
          li(text="xl") Your Reward:
          li(text="xl" color="white" font="bold") 0
  button(btn="~ primary-outline") CLICK ME

</template>

<script lang="ts" setup>

</script>