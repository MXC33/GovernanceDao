<template lang="pug">
HList(ref="hoverElement")
  slot()

Teleport(to="#infobox")
  HList(v-if="isHovered" opacity="on-active:100 0 on-hover:100" transition="opacity" :hover="isHovered" cursor="default" z="400")
    HList
      div.info-box(font="bold" text="xs" bg="mc-gray" p="2" color="white" z="400")
        span(bg="gray-900" px="4" py="1")  {{ $t('tooltips.' + tooltipId) }}
</template>

<script lang="ts" setup>
const hoverElement = ref()
const isHovered = useElementHover(hoverElement)

defineProps<{
  tooltipId: string
}>()
</script>