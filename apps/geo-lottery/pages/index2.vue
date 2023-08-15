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

VList(flex-grow="1" space-y="12" px="4 md:8" bg="black" )

  //Back Frame
  div(grid="~ md:cols-12" py="6"  gap="4 md:8")
    div(grid=" md:col-start-4 md:col-span-6" space-y="4")
      PopupFrame()
        template(#content)
          VList(p="4" pb="8" border-t="~" border-solid="~" border-gray-700="~" z="3" text="md" font="400" color="$mc-whitenew" space-y="6")
            div() Choose method
            div()
              InputRadio(v-model="ixtPrice" :model-value="'1'" :is-selected="false" @update:modelValue="")
                template(#default) test 1
                template(#value) 1
              InputRadio(v-model="ixtPrice" :model-value="'15'" :is-selected="false" @update:modelValue="")
                template(#default) test 2 isSelected
                template(#value) 15
              InputRadio(v-model="ixtPrice" :model-value="'3'" :is-selected="ixtPricefalse" @update:modelValue="")
                template(#default) test 3
                template(#value) 3

            VList()
              Button() Continue

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
      AccordionItem()
        template(#icon)
          Plus()
        template(#header) Size: Domain
        template(#default)
          p Perks with subscribing:
          div()
            p text with icon


      //Acc with status
      AccordionItem(status="accept")
        template(#header) Location: Sweden
        template(#default)
          p Perks with subscribing:
          div()
            p text with icon
      AccordionItem(status="accept" :startOpen="true")
        template(#header) Location: Sweden
        template(#default)
          VList(my="md:2" divide-y="~ md:none" divide-x="md:~" divide-gray-700 flex="~ col md:row" text="center")
            VList(flex-1 py="3 md:2" px="0 md:5" items="center" justify="center")
              span(color="gray-100" text="sm" uppercase ="~" font-medium="~") Winners
              span(text="xl") 21,355
            VList(flex-1 py="3 md:2" px="0 md:5" items="center" justify="center")
              span(color="gray-100" text="sm" uppercase ="~" font-medium="~") Tickets
              span(text="xl") 42,810
            VList(flex-1 py="3 md:2" px="0 md:5" items="center" justify="center")
              span(color="gray-100" text="sm" uppercase ="~" font-medium="~") Payout Per Ticket
              span(text="xl") 160,000


      AccordionItem(status="decline")
        template(#header) Location: Sweden
        template(#default)
          VList(my="md:2" divide-y="~ md:none" divide-x="md:~" divide-gray-700 flex="~ col md:row" text="center")
            VList(flex-1 py="3 md:2" px="0 md:5" items="center" justify="center")
              span(color="gray-100" text="sm" uppercase ="~" font-medium="~") Winners
              span(text="xl") 0
            VList(flex-1 py="3 md:2" px="0 md:5" items="center" justify="center")
              span(color="gray-100" text="sm" uppercase ="~" font-medium="~") Tickets
              span(text="xl") 42,810
            VList(flex-1 py="3 md:2" px="0 md:5" items="center" justify="center")
              span(text="text-sm") IXT in this pool will be pushed to next raffle, since it had 0 winners.

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
              Button() PURCHASE

</template>


<script lang="ts" setup>
import TimeCountdown from "~/components/TimeCountdown.vue";

useHead({
  title: "Home | Geo Lottery | PlanetIX"
})
const { id } = defineProps<{
  id: string,
}>()

const ixtPricefalse = true
const ixtPrice = 15

import type { AdjustableNumber } from '@ix/base/composables/Utils/useAdjustableNumber';
/*const value = defineModel<AdjustableNumber>()*/

import Plus  from '~/assets/icons/plus.svg'

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
