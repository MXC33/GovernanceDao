<template lang="pug">
div(class="body-main-color")
  div( pos="relative" overflow="hidden" z="0" min-h="600px" class="background-holder header-cat" m="t-8 r-5 l-5")
      Background( inset="0" object="cover center" pos="absolute" z="-1")
        template(#image-source)
          img(src="~/assets/images/cat-background.png" inset="0"  z="0" object="cover" h="full" w="full")
      div(w="full" flex="~" justify="center" h="full" items-center pos="absolute" top="0" bottom="0")
        div(container mx-3 lg:px-10 xl:px-30 h="full" flex=" ~ col" justify="between" p="t-6 b-8 sm:t-8 sm:b-16")
          div()
            h3(color="$mc-pink" font="bdrA3mik" text="3xl center") TERRITORY LOTTERY
            h1(text="lg center" font="blender") OWN TERRITORIES | BUY TICKETS | WIN BIG
          div()
            p(font="bold" text="base sm:lg center" ) Every week, territories from around the world are randomly selected. <br> Join today and you will have the chance to win:
            h1(text="4xl md:6xl lg:8xl center" font="bdrA3mik") 2,050,080 AGOLD
          div(flex="~ col sm:row" justify="center" m="t-6" items-center)
            Button(:value="'pink'" w="250px sm:auto" min-w="md:255px" mb="3 sm:0" mr="0 sm:3") JOIN NOW
            Button(:value="'white'" w="250px sm:auto" min-w="md:255px") SWAP ASTRO GOLD
  div(class="background-holder points" pos="relative" overflow="hidden" z="0")
    Background( inset="0" object="cover center" pos="absolute" z="-1")
      template(#image-source)
        img(src="~/assets/images/points.png" inset="0"  z="0" object="cover" h="full" w="full")
    div(w="full" flex="~" justify="center" pos="absolute" top="0" bottom="0")
      div(container mx-3 lg:px-10 xl:px-30)
        //How to Play Section
        HList(flex="~ col lg:row" items="center" gap="12 lg:32")
          div(flex="~ 1" items="center")
            div(space-y="4")
              div(color="ix-white" text="4xl sm:6xl" uppercase="~") how to play
              ul(list="square" color="ix-white" font="bold" text="lg" space-y="6" pl="5")
                li() Each week, a geolocation, size, and tier are randomly selected through a drawing. If you happen to own a territory that matches all three attributes, you become the winner of the jackpot!
                li() Pool 2 will be shared among all territory owners whose tier and geolocation match the draw. This means that even if your territory size doesn't match, you will still be a winner!
                li() Furthermore, owners of territories that only match the drawn geolocation will share the prizes from Pool 3!
              p(color="ix-white" font="bold" text="lg") Don’t own a territory?
              Button(:value="'pink'" w="250px sm:auto" min-w="md:255px" @click="logoutWallet") Get Your Own At Netempire

          VList(flex="~ 1 col" space-y="6" items="center" justify="center" w="full")
            FramePinkWithImg()
              template(#title) COMMON PRIZE
              template(#subtitle) COUNTRY
              template(#content)
                img(src="~/assets/images/country-img-line.png")
            FramePinkWithImg()
              template(#title) RARE PRIZE
              template(#subtitle) COUNTRY <br> + TIER
              template(#content)
                TireHexagonColor(tier="Rare")
            FramePinkWithImg()
              template(#title) COMMON PRIZE
              template(#subtitle) COUNTRY <br> + TIER <br> + Size
              template(#content)
                TireSizeIcon(tier="Outlier" size="Domain")
        RoundCountdown()
          template(#minutes) 52
          template(#seconds) 33
        TierSize()
          template(#tier) LEGENDARY
          template(#size) sector
          template(#id) CN
  div(w="full" flex="~ col" justify="center")
    div(w="full" flex="~" justify="center")
      div(container mx-3 lg:px-10 xl:px-30)
        div(b="t-1 gray-300" mb="20")
          AccordionItem()
            template(#header) ROUND #027
            template(#claimed_size) CLAIM YOUR PRIZE
            template(#claim_now) CLAIM NOW
            template()
          AccordionItem()
            template(#header) ROUND #028
            template()
              p text with icon
          AccordionItem()
            template(#header) ROUND #029
            template(#claimed) claimed
            template()

        //Prize Check
        HList(flex="~ col lg:row" items="center" gap="12 lg:32")
          div(flex="~ 1" items="center")
            div(space-y="4")
              div(color="ix-white" text="4xl sm:6xl" uppercase="~") Prize Check
              p(color="ix-white" font="bold" text="lg") Streamable Dynamic NFTs Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate, ipsum in ultricies dictum, erat diam porttitor diam, quis pharetra sapien dui et massa. Lorem ipsum.
              ul(list="square" color="ix-white" font="bold" text="lg" pl="5")
                li() Stream your winnings continually to your wallet
                li() Full ownership rights
                li() Fully tradable
          VList(flex="~ 1 col" space-y="6" items="lg:end" justify="center" w="full")
            div() Link with svg for info

</template>


<script lang="ts" setup>
import TimeCountdown from "~/components/TimeCountdown.vue";

useHead({
  title: "Home | Geo Lottery | PlanetIX"
})
const { id } = defineProps<{
  id: string,
}>()


import type { AdjustableNumber } from '@ix/base/composables/Utils/useAdjustableNumber';
/*const value = defineModel<AdjustableNumber>()*/

import Plus  from '~/assets/icons/plus.svg'
import Statistics from "~/components/Statistics.vue";
import TestEnterLottery from "~/components/TestEnterLottery.vue";
import Background from "~/components/Background.vue";
import TierSize from "~/components/TierSize.vue";

const value = {
  multiplier: 3,
  max: 10,
  min: 1,
  value: 2,
}
</script>
<style>

.body-main-color{
  background-image: linear-gradient(#1f1016, #580623);
}
</style>
