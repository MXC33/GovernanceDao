<template lang="pug">
div(class="tier_size")
  div(grid grid-cols="3" gap="2 md:4" p="x-3 md:x-10 2xl:x-23")
    div( flex="~ col" justify="center" align="center" pb="4"  border-color="$mc-pink" border="b-2")
      p(color="white opacity-40" text="sm md:xl" font="extrabold" mb="1" uppercase="~") ID

      div(:color="id.is_winner ? '$mc-success' : '$mc-red'" :class="!id.is_winner ? 'line-through' : ''" text="lg md:2xl lg:4xl" font="extrabold" uppercase="~" v-if="id && id.name") {{id.name}}
      div(color="white" text="lg md:2xl lg:4xl" font="extrabold" uppercase="~"  v-else) -

    div( flex="~ col" justify="center" align="center" pb="4" border-color="$mc-pink" border="b-2")
      p(color="white opacity-40" text="sm md:xl" font="extrabold" mb="1" uppercase="~") TIER

      div(:color="tier.is_winner ? '$mc-success' : '$mc-red'" :class="!tier.is_winner ? 'line-through' : ''" text="lg md:2xl lg:4xl" font="extrabold" uppercase="~" v-if="tier && tier.name") {{tier.name}}
      div(color="white" text="lg md:2xl lg:4xl" font="extrabold" uppercase="~"  v-else) -

    div( flex="~ col" justify="center" align="center" pb="4" border-color="$mc-pink" border="b-2")
      p(color="white opacity-40" text="sm md:xl" font="extrabold" mb="1" uppercase="~") SIZE

      div(:color="size.is_winner ? '$mc-success' : '$mc-red'" :class="!size.is_winner ? 'line-through' : ''" text="lg md:2xl lg:4xl" font="extrabold" uppercase="~" v-if="size && size.name") {{size.name}}
      div(color="white" text="lg md:2xl lg:4xl" font="extrabold" uppercase="~"  v-else) -
</template>

<script lang="ts" setup>
const { id, tier, size } = defineProps<{
  id?: {
    name: string,
    is_winner: boolean
  }
  tier?: {
    name: string,
    is_winner: boolean
  }
  size?: {
    name: string,
    is_winner: boolean
  }
}>()
</script>
