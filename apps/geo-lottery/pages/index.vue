<template lang="pug">
VList(w="full" mt="10")
div( pos="relative" overflow="hidden" z="0" min-h="600px")
  Background( inset="0" object="cover center" pos="absolute" z="-1")
  div(w="full" flex="~" justify="center" h="full" items-center pos="absolute")
    div(container mx-3 lg:px-10 xl:px-30 h="full" flex=" ~ col" justify="space-between" p="t-6 b-8 sm:t-8 sm:b-16")
      div()
        h3(color="$mc-pink" font="bdrA3mik" text="3xl center") TERRITORY LOTTERY
        h1(text="lg center" font="blender") OWN TERRITORIES | BUY TICKETS | WIN BIG
      div()
        p(font="bold" text="base sm:lg center" ) Every week, territories from around the world are randomly selected. <br> Join today and you will have the chance to win:
        h1(text="4xl md:6xl lg:8xl center" font="bdrA3mik") 2,050,080 IXT
      div(flex="~ col sm:row" justify="center" m="t-6" items-center)
        Button(:value="'pink'" w="250px sm:auto" min-w="md:255px" mb="3 sm:0" mr="0 sm:3") JOIN NOW
        Button(:value="'white'" w="250px sm:auto" min-w="md:255px") SWAP ASTRO GOLD
div(w="full" flex="~" justify="center")
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
          ButtonSound(sound="lg" btn="~ accent lg" color="white" text-shadow="none" @click="logoutWallet" cut="bottom-right s-md b-ix-primary") Get Your Own At Netempire

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
      template(#minutes)
      template(#seconds) 09
    TierSize()
      template(#tier) LEGENDARY
      template(#size) sector
      template(#id) CN
    div(b="t-1 gray-600" mb="20")
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




//div(grid="~ md:cols-12" p="6")
//  div(col="start-4 span-6" p="x-14")
//    VList(pos="relative" w="full")
//      TestEnterLottery(mb="6")
//      Button(:value="'pink'") GET YOUR OWN AT NETEMPIRE
//      List()
//        template(#content) One country is drawn every week, if you own a territory in that country you win! Feeling lucky?
//        template(#enter) Criteria to enter:
//      TimeCountdown()
//      Statistics()
//        template(#content) PLAYERS
//        template(#number) 21,355
//        template(#content-2) TICKET ENTRIES
//        template(#number-2) 341,680
//div(flex-grow="1" space-y="12" px="4 md:8" bg="black" )
//  //Accoardion Box
//
//  div(grid="~ md:cols-12" py="6" gap="4 md:8")
//    div(grid=" md:col-start-4 md:col-span-6" space-y="4")
//      AccordionItem()
//        template(#header) Ticket entry pool split
//        template(#default)
//          p Perks with subscribing:
//          div()
//            p text with icon
//
//      AccordionItem()
//        template(#header) What is a territory?
//        template(#default)
//          p Perks with subscribing:
//          div()
//            p text with icon
//      AccordionItem()
//        template(#header) How to buy IXT
//        template(#default)
//          p Perks with subscribing:
//          div()
//            p text with icon
//
//      //Acc with icon
//      AccordionItem(:status="true")
//        template(#header) Location: Sweden
//        template(#default)
//          p Perks with subscribing:
//          div()
//            p text with icon
//      AccordionItem()
//        template(#icon)
//          Plus()
//        template(#header) Size: Domain
//        template(#default)
//          p Perks with subscribing:
//          div()
//            p text with icon
//
//      AccordionItem()
//        template(#default)
//          p Perks with subscribing:
//          div()
//            p text with icon
//
//  //Back Frame
//  div(grid="~ md:cols-12" py="6"  gap="4 md:8")
//    div(grid=" md:col-start-4 md:col-span-6" space-y="4")
//      PopupFrame()
//        template(#content)
//          VList(p="4" pb="8" border-t="~" border-solid="~" border-gray-700="~" z="3" text="md" font="400" color="$mc-whitenew" space-y="8")
//            div() Better your chances with ticket entries!
//            div()
//              Adjustable(v-model="value"  w="full" :is-neutral="true" frame="~ hover:gray-300")
//              div(mt="1" text="3" color="gray-200") Your entries 0
//
//          VList(p="4" border-t="~" border-solid="~" border-gray-700="~" z="3" text="base" font="400" color="$mc-whitenew" space-y="4")
//            VList(space-y="2")
//              HList(justify="between" flex-shrink="0")
//                span() Total ticket entries
//                span() 1
//
//              HList(justify="between" flex-shrink="0")
//                span() Total price
//                span() 6 IXT
//
//            VList()
//              ButtonSound(sound="sm" btn="~ primary" opacity="s-invalid:50" w="full" font="bold" transition="all" ref="button" pos="relative" pointer-events="s-loading:none s-invalid:none")
//                span() BuTton
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

.main-tabs span{

}
</style>
