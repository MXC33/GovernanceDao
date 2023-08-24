<template lang="pug">
VList(max-h="85" frame="~ gray-400 on-frameless:none on-mobile:none" :frameless="noFrame" :mobile="isMobile" v-if="!disable")
  HList(h="12" px="6 on-small:3" bg="ix-black on-neutral:gray-900" b="on-table:b-1 gray-600 on-meta:t-1 gray-600" :meta="isMeta" items="center" justify="between" pos="sticky top-0" flex-shrink="0" z="1" @click.stop="dropDrawer" uppercase="~" cursor="pointer" :neutral="isNeutral" :small="isSmall" :table="isTable")
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

const { startOpen, noFrame = false, isMeta = false } = defineProps<{
  startOpen?: boolean
  isSmall?: boolean
  isNeutral?: boolean
  noFrame?: boolean
  isMeta?: boolean
  isTable?: boolean
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
