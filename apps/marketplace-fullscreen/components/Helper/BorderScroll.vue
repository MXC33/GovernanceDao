<template lang="pug">
ClientOnly
  Transition(name="fade-slow" mode="in-out")
    div(ml="-8" mr="-8" pos="sticky top-33" z="99" b="on-scrolling:b-1 gray-400" :scrolling="isScrolling")
</template>

<script lang="ts" setup>
const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value >= 518
})
</script>