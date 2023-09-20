<template lang="pug">
HList(pos="relative" cursor="pointer" font="bold" @mouseenter="mouseEnter" @mouseleave="mouseLeave" gap="2")
  slot(name="resources")

  HList(v-if="isHovered == true" opacity="on-active:100 0 on-hover:100" transition="opacity" :hover="isHovered" pos="absolute top-6" bg="gray-800" cursor="default")
    slot(name="info")

</template>

<script lang="ts" setup>
const isHovered = ref(false)

const mouseEnter = () => {
  isHovered.value = true
}

const mouseLeave = () => {
  isHovered.value = false
}

</script>