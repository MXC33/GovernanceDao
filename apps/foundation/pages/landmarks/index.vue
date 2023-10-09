<template lang="pug">
VList(grid="~ col gap-6")
  div(grid="~ col" b="solid purple 1")
    HeaderTitle(:index="13" b="solid white 1")
    ClaimHorizontal(b="solid green 1")
  HeaderTitle(:index="14" b="solid red 1")
  div(grid="~ col" b="solid pink 1")
    Card(b="solid blue 1")
      h3 No landmarks available
  HeaderTitle(:index="15" b="solid yellow 1")

</template>

<script lang="ts" setup>

</script>