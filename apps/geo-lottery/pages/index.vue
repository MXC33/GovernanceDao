<template lang="pug">
VList(w="full")
  div( flex px="4 md:10 lg:25")
    div(flex border-color="$mc-gray-700" border="b-1" w="full")
      a(font="bold" text="base" color="$mc-pink"  m="r-6" p="b-5 l-3 r-3" border-color="$mc-pink" border="b-3" cursor="pointer") Raffle
      a(font="bold" text="base" color="hover:$mc-pink" m="r-6" p="b-5 l-3 r-3" cursor="pointer") How it works
      a(font="bold" text="base" color="hover:$mc-pink" m="r-6"  p="b-5 l-3 r-3" cursor="pointer") History
      a(font="bold" text="base" color="hover:$mc-pink" p="b-5 l-3 r-3" cursor="pointer") Introduction
div(grid="~ md:cols-12" p="6")
  div(col="start-4 span-6" p="x-14")
    VList(pos="relative" w="full")
      TestEnterLottery(mb="6")
      List()
        template(#content) One country is drawn every week, if you own a territory in that country you win! Feeling lucky?
        template(#enter) Criteria to enter:
      Button(:value="'next'") Continue
      Button(:value="'next-blur'") Continue
      Button(:value="'next-black'") Continue
      Button(:value="'disable'") Continue
      TimeCountdown()
      Statistics()
        template(#content) PLAYERS
        template(#number) 21,355
        template(#content-2) TICKET ENTRIES
        template(#number-2) 341,680
//VList(flex-grow="1" pos="relative" min-h="0" justify="center" p="3" items="center" bg="red")
//  ButtonSound(sound="lg" btn="~ accent lg" color="white" text-shadow="none" @click="logoutWallet" cut="bottom-right s-md b-ix-primary") {{$t(`general.disconnect`)}}
//
//  WalletButtonConnect()
//  FormCheckbox()
//
//  AdjustableButton(type="minus" @click="decreaseAmount" :is-adjustable="isDecreasable" :inline="inline")
//
//
//  template(#collapsable)
//    Collapse(:when="true" class="v-collapse")
//      VList(p="6" w="full" space-y="3")
//
//        div(b="t-1 gray-600")
//
//        slot(name="adjustments")
//          p ajhsdjkash askjdhas kdjaskh asjkhdka
//


      div()
        List()
          template(#content) One country is drawn every week, if you own a territory in that country you win! Feeling lucky?
          template(#enter) Criteria to enter:
        Button() Continue
        TimeCountdown()

div(flex-grow="1" space-y="12" px="4 md:8" bg="black" )
  //Accoardion Box

  div(grid="~ md:cols-12" py="6" gap="4 md:8")
    div(grid=" md:col-start-4 md:col-span-6" space-y="4")
      AccordionItem()
        template(#header) Ticket entry pool split
        template(#default)
          p Perks with subscribing:
          div()
            p text with icon

      AccordionItem()
        template(#header) What is a territory?
        template(#default)
          p Perks with subscribing:
          div()
            p text with icon
      AccordionItem()
        template(#header) How to buy IXT
        template(#default)
          p Perks with subscribing:
          div()
            p text with icon

      //Acc with icon
      AccordionItem(:status="true")
        template(#header) Location: Sweden
        template(#default)
          p Perks with subscribing:
          div()
            p text with icon
      AccordionItem()
        template(#icon)
          Plus()
        template(#header) Size: Domain
        template(#default)
          p Perks with subscribing:
          div()
            p text with icon

      AccordionItem()
        template(#default)
          p Perks with subscribing:
          div()
            p text with icon

  //Back Frame
  div(grid="~ md:cols-12" py="6"  gap="4 md:8")
    div(grid=" md:col-start-4 md:col-span-6" space-y="4")
      PopupFrame()
        template(#content)
          VList(p="4" pb="8" border-t="~" border-solid="~" border-gray-700="~" z="3" text="md" font="400" color="$mc-whitenew" space-y="8")
            div() Better your chances with ticket entries!
            div()
              Adjustable(v-model="value"  w="full" :is-neutral="true" frame="~ hover:gray-300")
              div(mt="1" text="3" color="gray-200") Your entries 0

          VList(p="4" border-t="~" border-solid="~" border-gray-700="~" z="3" text="base" font="400" color="$mc-whitenew" space-y="4")
            VList(space-y="2")
              HList(justify="between" flex-shrink="0")
                span() Total ticket entries
                span() 1

              HList(justify="between" flex-shrink="0")
                span() Total price
                span() 6 IXT

            VList()
              ButtonSound(sound="sm" btn="~ primary" opacity="s-invalid:50" w="full" font="bold" transition="all" ref="button" pos="relative" pointer-events="s-loading:none s-invalid:none")
                span() BuTton
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
