<template lang="pug">
VList(max-h="80" overflow-y="auto")
  VList(overflow-y="auto" h="full")
    VList(h="12" bg="ix-black" justify="center" pos="sticky top-0" flex-shrink="0" z="1")
      HList(uppercase="~" items="center" justify="between" px="6" font="bold" cursor="pointer" @click.stop="dropDrawer")
        span(color="white" text="md")
          slot(name="header")
        ChevronIcon(w="5" translate-y="-0.35" fill="white" transition="opacity" :selected="isOpen" rotate="on-selected:-180deg")

    Transition(name="slide-top")
      slot(v-if="isOpen")

div(b="b-1 gray-600" bg="black" ml="-8")

</template>

<script lang="ts" setup>
import ChevronIcon from '~/assets/icons/chevron-down.svg'

const { startOpen } = defineProps<{
  startOpen?: boolean
}>()

const isOpen = ref(startOpen)
const dropDrawer = () => { isOpen.value = !isOpen.value }

</script>