<template lang="pug">
HList(ref="hoverElement")
  slot()

Teleport(to="#infobox")
  HList(v-if="isHovered" opacity="on-active:100 0 on-hover:100" transition="opacity" :hover="isHovered" cursor="default" z="400")
    HList(items="center")
      div.info-box(font="bold" text="xs" bg="gray-800" p="2" color="white" z="400")
        span(bg="gray-600" px="4" py="2" font="bold" text="sm")  {{ tooltipId }}
    div.triangle(pos="absolute top-7.6 left-8" z="999")
</template>

<script lang="ts" setup>
const hoverElement = ref()
const isHovered = useElementHover(hoverElement)

defineProps<{
  tooltipId: string
}>()
</script>

<style>
.triangle {
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-top: 10px solid #333333;
  border-bottom: 0px;
}
</style>
