<template lang="pug">
div(font="bdra" bg="pink" py="3" text="xl" color="black")
  Vue3Marquee(:duration="60")
    span(v-for="word in allTheWords" px="3") {{ word }}
</template>

<script lang="ts" setup>
import { Vue3Marquee } from 'vue3-marquee'
const words = ["LUCKY CAT", "69 T SUPPLY", "TO THE MOON", "$MILK"]
const allTheWords = [...words, ...words, ...words, ...words, ...words]

</script>

<style>
.marquee {

  will-change: auto;
  scroll-behavior: smooth;
  backface-visibility: hidden;
}
</style>
