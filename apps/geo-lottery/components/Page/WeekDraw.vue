<template lang="pug">
div()
  h2(mb-7 text="3xl md:4xl xl:5xl" font="bdrA3mik") THIS WEEK’S DRAW
  div(bg="black" rounded="4" b="1 $mc-pink" py-16)
    RoundCountdown(mb-18)
      template(#minutes)
      template(#seconds) 09
    TierSize()
      template(#tier) LEGENDARY
      template(#size) sector
      template(#id) CN
</template>

<script lang="ts" setup>

</script>
