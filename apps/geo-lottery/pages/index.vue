<template lang="pug">
div(class="body-main")
  VList(class="background-holder" pos="relative" overflow="hidden" z="0" min-h="600px" m="t-6 r-3 l-3 sm:t-10 sm:r-5 sm:l-5")
      Background( inset="0" object="cover center" pos="absolute" )
        template(#image-source)
          img(src="~/assets/images/cat-background.png" inset="0" object="cover" h="full" w="full" pos="absolute" z="-1")
      div(w="full" flex="~" justify="center" h="full" items-center pos="absolute")
        div(container mx-3 lg:px-10 xl:px-30 h="full" flex=" ~ col" justify="between" p="t-6 b-12 sm:t-8 sm:b-16")
          div()
            h3(color="$mc-pink" font="bdrA3mik" text="3xl center") TERRITORY LOTTERY
            h1(text="lg center" font="blender") OWN TERRITORIES | BUY TICKETS | WIN BIG
          div()
            p(font="bold" text="base sm:lg center" ) Every week, territories from around the world are randomly selected. <br> Join today and you will have the chance to win:
            h1(text="4xl md:7xl lg:8xl center" font="bdrA3mik") 2,050,080 IXT
          div(flex="~ col sm:row" justify="center" m="t-6" items-center)
            ButtonItem(:value="'pink'" :text="'SWAP ASTRO GOLD'"  min-w="300px md:255px" mb="3 sm:0" mr="0 sm:3")
            ButtonItem(:value="'white'" :text="'SWAP ASTRO GOLD'" min-w="300px md:255px" )
  VList(class="background-holder"  pos="relative" overflow="hidden" z="0")
    Background()
      template(#image-source)
        img(src="~/assets/images/points.png" inset="0"  z="-1" object="contain top" h="full" w="full" pos="absolute")
    div(w="full" flex="~" justify="center")
      div(container mx-3 lg:px-10 xl:px-30 space-y-14 md:space-y-18 lg:space-y-32 m="y-14 sm:y-22 md:y-32")
        //How to Play Section
        PageInfo()

        RoundCountdown()
          template(#minutes)
          template(#seconds) 09
        TierSize()
          template(#tier) LEGENDARY
          template(#size) sector
          template(#id) CN
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
        PagePrizeCheck()
        //Price & Pool Distribution
        PageDistribution()


</template>


<script lang="ts" setup>

useHead({
  title: "Home | Geo Lottery | PlanetIX"
})

import Background from "~/components/Background.vue";
import TierSize from "~/components/TierSize.vue";

</script>
<style>

.body-main{
  background-image: linear-gradient(#1f1016, #580623);
}
</style>
