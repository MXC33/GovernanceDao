<template lang="pug">
div(class="body-main")
  PageBanner()
  VList(class="background-holder"  pos="relative" overflow="hidden" z="0")
    Background()
      template(#image-source)
        img(src="~/assets/images/points.png" inset="0"  z="-1" object="contain top" h="full" w="full" pos="absolute")
    div(w="full" flex="~" justify="center")
      div(container mx-3 lg:px-10 xl:px-30 space-y-14 md:space-y-18 lg:space-y-32 m="y-14 sm:y-22 md:y-32")
        //How to Play Section
        PageInfo()
        PageWeekDraw()
        PageRounds()

        //The Jackpot
        PageJackpot()
        //Prize Check
        PagePrizeCheck()
        //Price & Pool Distribution
        PageDistribution()


</template>


<script lang="ts" setup>
useHead({
  title: "Home | Geo Lottery | PlanetIX"
})

import Background from "~/components/Background.vue";

</script>
<style>
.body-main{
  background-image: linear-gradient(#1f1016, #580623);
}
</style>
