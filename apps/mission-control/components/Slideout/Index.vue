<template lang="pug">
Transition(:name="isMobile ? 'slide-bottom' : 'slide-left'")

  VList.slideout(bg="black opacity-60" backdrop="~ blur-lg" flex-grow="md:1" color="white" pos="sticky left-0 top-auto bottom-0 lt-md:right-0 md:(absolute bottom-0 top-0)" min-w="md:100" w="md:25vw" z="6" b="md:r-1 mc-orange_40" ref="slideoutElement" max-h="full" pointer-events="auto" :style="elementStyle" v-if="isOpen")

    div(flex="~ col grow" h="full")
      .grabbable(ref="headerElement" @mousedown="touchHandler(true)" @mouseup="touchHandler(false)" @touchstart="touchHandler(true)" @touchend="touchHandler(false)" z="1")

        SlideoutHeader(@close="$emit('close')" @step-back="$emit('stepBack')" :title="title" :is-nested="isNested" :is-mobile="isMobile") 
          template(#default)
            div(w="4" bg="green")
            slot(name="header")

          template(#nested-header)
            slot(name="nested-header")

      VList.slideout-container(overflow-y="auto" overflow-x="hidden" flex-grow="1" scrollbar="~ mc") 
        slot(name="default")

div(pos="absolute" inset="0" z="5" ref="containerElement" m="!0" pointer-events="none")

</template>

<script lang="ts" setup>
const headerElement = ref()
const containerElement = ref()
const isMobile = useMobileBreakpoint('md')
const { height: containerHeight } = useElementBounding(containerElement, { windowScroll: true })

onClickOutside(headerElement, () => cancelDrag())

const props = defineProps<{
  isOpen: boolean,
  title: string,
  isNested?: boolean,
}>()

const { slideDown, touchHandler, elementStyle, currentSnap, slidePosition, isActive, toggleOpen, cancelDrag } = useDraggableMenu(headerElement, containerHeight)

onKeyStroke('Escape', () => {
  if (!props.isOpen)
    return

  emit('close')
})

watch(isMobile, (active) => {
  isActive.value = active
}, { immediate: true })

watch(currentSnap, () => {
  emit("updatePosition", slidePosition.value)
})

const emit = defineEmits(["close", "updatePosition", "stepBack"])

watch(() => props.isOpen, (open) => {
  if (open)
    nextTick(() => slideDown())

  toggleOpen(open)

}, { immediate: true })
</script>

<style>
.grabbable {
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.slideout {
  will-change: transform;
}

.slideout-container {
  scroll-behavior: smooth;
}
</style>