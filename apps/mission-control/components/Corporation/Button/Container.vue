<template lang="pug">
ButtonSound(sound="lg" p="0" w="full" text="left sm sm:xs lg:sm" group flex="~ col" cut="md:bottom-right s-lg")

  HList(items="center" w="full")
    HList(bg="$mc-accent" h="18 md:32" aspect="square" justify="center" items="center" transition="bg" v-if="$slots.icon")

      slot(name="icon")

    HList(min-w="0" w="full" pr="3" text="$corporation-text-color" bg="$mc-menu-button group-hover:opacity-30 on-outline:!transparent" transition="all" backdrop="blur lg" h="18 md:32" items="center" :outline="outline")
      VList(p="4" w="full")
        HList(v-if="$slots.header" space-x="2")
          slot(name="header")
          div(font="bold" color="$mc-accent" v-if="$slots.orders")
            slot(name="orders")

        slot(name="content")

      ArrowIcon(fill="$corporation-text-color" w="8" flex-shrink="0")

</template>

<script lang="ts" setup>
import ArrowIcon from '~/assets/images/ui/corporations/arrow.svg'
defineProps<{
  outline?: boolean
}>()

</script>