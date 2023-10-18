<template lang="pug">
VList(max-h="85" frame="~ gray-400 on-frameless:none" :frameless="noFrame"  v-if="!disable")
  HList(h="12" px="6" bg="gray-900" b="b-1 gray-600" items="center" justify="between" pos="sticky top-0" flex-shrink="0" z="1" @click.stop="dropDrawer" uppercase="~" cursor="pointer")
    div(color="white" text="md" font="bold" v-if="$slots.header")
      slot(name="header")

    HList(v-else)
      slot(name="titleicon")

    HelperChevron(w="5" :up="isOpen")

  Transition(name="slide-top")
    Collapse(:when="isOpen" class="v-collapse"  overflow-y="auto" )
      slot

VList.no-scrollbar(overflow="auto" max-h="85" v-else)
  slot

</template>

<script lang="ts" setup>
import { Collapse } from 'vue-collapsed'

const { startOpen, noFrame = false } = defineProps<{
  startOpen?: boolean
  isSmall?: boolean
  isNeutral?: boolean
  noFrame?: boolean
  disable?: boolean
}>()

const isOpen = shallowRef(startOpen)

const { isMobile } = useDevice()

const dropDrawer = () => {
  isOpen.value = !isOpen.value
}

</script>


<style>
.v-collapse {
  transition: height 300ms cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
