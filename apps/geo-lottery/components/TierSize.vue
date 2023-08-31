<template lang="pug">
div( mb="10" )
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

div(flex="~" justify="center" font="bold" uppercase="~" text="base md:xl" m="b-10" flex-wrap)
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
  Button(:value="'pink'" mb="3 lg:0" w="250px sm:auto" mr="0 sm:3") PURCHASE TICKETS
  Button(:value="'white'" w="250px sm:auto") MANAGE TICKETS
</template>

<script lang="ts" setup>

import Button from "~/components/Button.vue";
</script>
