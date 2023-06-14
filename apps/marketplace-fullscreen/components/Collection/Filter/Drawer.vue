<template lang="pug">
VList(divide-y="0.5")
  VList(overflow-y="auto" h="full" pos="relative")
    HList(h="12" px="6 on-small:8" bg="gray-900 md:ix-black on-neutral:gray-900" items="center" justify="between" pos="md:sticky top-0" flex-shrink="0" z="md:1" @click.stop="dropDrawer" uppercase="~" cursor="pointer" :small="isSmall" :neutral="isNeutral")
      span(color="white" text="md" font="bold" v-if="$slots.header")
        slot(name="header")

      HelperChevron(w="5" :up="isOpen")

    Transition(name="slide-top")
      Collapse(:when="isOpen" class="v-collapse"  overflow-y="auto")
        slot

  div(b="b-1 gray-600" v-if="!isOpen")
</template>

<script lang="ts" setup>
import { Collapse } from 'vue-collapsed'

const { startOpen } = defineProps<{
  startOpen?: boolean
  isSmall?: boolean
  isNeutral?: boolean
}>()

const isOpen = ref(startOpen)
const dropDrawer = () => { isOpen.value = !isOpen.value }

</script>


<style>
.v-collapse {
  transition: height 300ms cubic-bezier(0.33, 1, 0.68, 1);
}
</style>