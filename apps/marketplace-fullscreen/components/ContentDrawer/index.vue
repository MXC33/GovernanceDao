<template lang="pug">
VList(max-h="85" frame="~")
  VList(overflow-y="auto" h="full" pos="relative")
    HList(h="12" px="6 on-small:3" bg="ix-black" items="center" justify="between" pos="sticky top-0" flex-shrink="0" z="1" @click.stop="dropDrawer" uppercase="~" cursor="pointer" :small="isSmall")
      span(color="white" text="md" font="bold" v-if="$slots.header")
        slot(name="header")

      HList(v-else)
        slot(name="titleicon")

      ChevronIcon(w="5" translate-y="-0.35" fill="white" transition="all" :selected="isOpen" rotate="on-selected:-180deg")

    Transition(name="slide-top")
      Collapse(:when="isOpen" class="v-collapse"  overflow-y="auto" )
        slot

</template>

<script lang="ts" setup>
import ChevronIcon from '~/assets/icons/chevron-down.svg'
import { Collapse } from 'vue-collapsed'

const { startOpen } = defineProps<{
  startOpen?: boolean
  isSmall?: boolean
}>()

const isOpen = ref(startOpen)
const dropDrawer = () => { isOpen.value = !isOpen.value }

</script>


<style>
.v-collapse {
  transition: height 300ms cubic-bezier(0.33, 1, 0.68, 1);
}
</style>