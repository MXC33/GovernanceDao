<template lang="pug">
div(class="tier_size")
  div(grid grid-cols="3" gap="2 md:4" p="x-3 md:x-10 2xl:x-23")
    div( flex="~ col" justify="center" align="center" pb="4"  border-color="$mc-pink" border="b-2")
      p(color="white opacity-40" text="sm md:xl" font="extrabold" mb="1" uppercase="~") ID
      div(color="$mc-finegreen" text="lg md:2xl lg:4xl" font="extrabold" v-if="$slots.id" uppercase="~") CN
    div( flex="~ col" justify="center" align="center" pb="4" border-color="$mc-pink" border="b-2")
      p(color="white opacity-40" text="sm md:xl" font="extrabold" mb="1" uppercase="~") TIER
      div( color="$mc-finegreen" text="lg md:2xl lg:4xl" font="extrabold" v-if="$slots.tier" uppercase="~") Legendary
    div( flex="~ col" justify="center" align="center" pb="4" border-color="$mc-pink" border="b-2")
      p(color="white opacity-40" text="sm md:xl" font="extrabold" mb="1" uppercase="~") SIZE
      div(color="$mc-red" text="lg md:2xl lg:4xl" font="extrabold"  line-through v-if="$slots.size" uppercase="~") Sector
</template>

<script lang="ts" setup>

</script>
