<template lang="pug">
ClientOnly
  Transition(name="fade-slow")
    div(ml="-8" mr="-8" pos="sticky top-33" z="99" b="on-scrolling:t-1 gray-600" :scrolling="isScrolling" v-if="isScrolling")
</template>

<script lang="ts" setup>
const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value >= 565
})

</script>