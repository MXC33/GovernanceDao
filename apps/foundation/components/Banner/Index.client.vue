<template lang="pug">
div(py="3" text="md")
  Vue3Marquee(:duration="100" :pause-on-hover="true")
    BannerTerritory()
    BannerIxt()
    BannerMetashare()
    BannerEnergy()
    BannerLandmark()
</template>
      
<script lang="ts" setup>
import { Vue3Marquee } from 'vue3-marquee'


</script>
  
<style>
.marquee {

  will-change: auto;
  scroll-behavior: smooth;
  backface-visibility: hidden;
}
</style>