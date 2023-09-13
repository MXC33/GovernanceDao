<template lang="pug">
div()
  h2(mb-7 text="3xl md:4xl xl:5xl" font="bdrA3mik") THIS WEEK’S DRAW
  div(bg="black" rounded="4" b="1 $mc-pink" py-16)
    div(mb="18")
      p(text="xl center" font="extrabold" m="b-4 md:b-8" ) ROUND #031
      HelperCountDown(:endTimestamp="1694776976000" :type="'large'")
    TierSize()
      template(#tier) LEGENDARY
      template(#size) sector
      template(#id) CN
</template>

<script lang="ts" setup>

</script>
