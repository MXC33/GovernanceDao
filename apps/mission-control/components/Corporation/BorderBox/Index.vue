<template lang="pug">
VList(flex-grow="1" pos="relative" overflow="visible" min-h="0")
  RCUTSTRAIGHT(stroke="$mc-accent" mx="-4" display="md:none")

  h3(v-if="title" text="base" uppercase="~" color="$mc-accent" bg="$corporation-bg-color" px="1.5" font="bold" pos="absolute top-0 left--1.5 md:left-7" z="2" translate-y="-50%") {{ title }}

  VList(b="md:1 $mc-accent" min-h="md:0" flex-grow="1" v-bind="$attrs" pt="0 md:3")
    VList(flex-grow="1" scrollbar="md:mc" min-h="0" overflow-y="md:scroll" p="md:(x-6 y-4)" space-y="6" :class="[`${blurred}`]" ref="el")

      VList(ref="child" flex-grow="1")
        slot

      slot(name="afterScroll")

  slot(name="outsideScroll")
</template>

<script lang="ts" setup>
import RCUTSTRAIGHT from '~~/assets/images/ui/lines/straight-cut-down-right.svg'

defineProps<{
  title?: string
}>()

const el = ref()
const child = ref()
const { height: parentHeight } = useElementBounding(el)
const { height: childHeight } = useElementBounding(child)
const { arrivedState } = useScroll(el)
const { bottom } = toRefs(arrivedState)

const hasScroll = computed(() => childHeight.value > parentHeight.value)

const blurred = computed(() => {
  if (!bottom.value && hasScroll.value)
    return 'container-blurred'

  return null
})
</script>

<style>
.container-blurred {
  -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  overflow-y: scroll;
}
</style>

<script lang="ts">
// use normal <script> to declare options
export default {
  inheritAttrs: false
}
</script>