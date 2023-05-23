<template lang="pug">
VList(max-h="80" overflow-y="auto" frame="~")
  VList(overflow-y="auto" h="full" pos="relative")
    HList(h="12" px="3" bg="ix-black" items="center" justify="between" pos="sticky top-0" flex-shrink="0" z="1" @click.stop="dropDrawer" uppercase="~" cursor="pointer")
      span(color="white" text="md")
        slot(name="header")

      ChevronIcon(w="5" translate-y="-0.35" fill="white" transition="all" :selected="isOpen" rotate="on-selected:-180deg")

    Transition(name="slide-top")
      div(v-if="isOpen")
        slot

</template>

<script lang="ts" setup>
import ChevronIcon from '~/assets/icons/chevron-down.svg'

const { startOpen } = defineProps<{
  startOpen?: boolean
}>()

const isOpen = ref(startOpen)
const dropDrawer = () => { isOpen.value = !isOpen.value }

</script>