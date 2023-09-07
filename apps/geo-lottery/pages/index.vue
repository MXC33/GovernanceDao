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
        PageInfo
        PageWeekDraw()
        VList(b="t-1 gray-300" mb="20")
          AccordionItem()
            template(#header) ROUND #027
            template(#claimed_size) CLAIM YOUR PRIZE
            template(#claim_now) CLAIM NOW
            template(#tier) UNCOMMON
            template(#size) AREA
            template(#id) CN
            template(#winners) 253
            template(#ticket) 29
            template(#total) 53,784
          AccordionItem()
            template(#header) ROUND #028
            template()
              p text with icon
          AccordionItem()
            template(#header) ROUND #029
            template(#claimed) claimed
            template()

        //Prize Check
        PagePrizeCheck
        //Price & Pool Distribution
        PageDistribution


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
