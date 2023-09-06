<template lang="pug">
div(class="tier_size")
  div(grid grid-cols="3" gap="2 md:4" p="x-3 md:x-10 2xl:x-23")
    div( flex="~ col" justify="center" align="center" pb="4"  border-color="$mc-pink" border="b-2")
      p(color="white opacity-40" text="sm md:xl" font="extrabold" mb="1" uppercase="~") ID
      div(color="$mc-finegreen" text="lg md:2xl lg:4xl" font="extrabold" v-if="$slots.id" uppercase="~")
        slot(name="id")
    div( flex="~ col" justify="center" align="center" pb="4" border-color="$mc-pink" border="b-2")
      p(color="white opacity-40" text="sm md:xl" font="extrabold" mb="1" uppercase="~") TIER
      div( color="$mc-finegreen" text="lg md:2xl lg:4xl" font="extrabold" v-if="$slots.tier" uppercase="~")
        slot(name="tier")
    div( flex="~ col" justify="center" align="center" pb="4" border-color="$mc-pink" border="b-2")
      p(color="white opacity-40" text="sm md:xl" font="extrabold" mb="1" uppercase="~") SIZE
      div(color="$mc-red" text="lg md:2xl lg:4xl" font="extrabold"  line-through v-if="$slots.size" uppercase="~")
        slot(name="size")

  div(flex="~" justify="center" font="bold" uppercase="~" text="base md:xl" m="y-6 md:y-10" flex-wrap)
    slot() YOUR ENTRIES:
      span(color="$mc-pink" m="x-1")
        slot() 20
      span()
        slot() ONE-TIME TICKET &
      span(  color="$mc-pink" m="x-1")
        slot() 10
      span()
        slot() Subscription TICKETS
  div(flex="~ col md:row" justify="center" items-center )
    ButtonItem(:value="'pink'" mb="3 md:0" mr="0 md:3" min-w="300px md:265px" :text="'PURCHASE TICKETS'")
    ButtonItem(:value="'white'" min-w="300px md:265px" :text="'MANAGE TICKETS'")
</template>

<script lang="ts" setup>

import Button from "~/components/Button.vue";
</script>
