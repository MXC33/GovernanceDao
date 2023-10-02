<template lang="pug">
div(flex="~ row wrap" mx="2")
  div(v-for="achivement in achivements" flex="1/4" m="r-8 b-4")
    UserShowcaseAchivementItem(:title="achivement")
</template>

<script setup>
const achivements = ['150 raids', 'aoc badge #1', '200 trees planted', 'rare facility', 'rank 21', '1.000 pix traded']
</script>
