<template lang="pug">
VList(overflow-y="auto" h="full" pos="relative" bg="gray-900" rounded="0.5" border="~" border-solid="~" border-gray-700="~")
  HList(h="12" px="4" items="center" justify="between" pos="md:sticky top-0" flex-shrink="0" z="md:1" v-if="showBackButton" )
    HList(group ref="arrowBackElement" items="center" pos="md:sticky top-0" cursor="pointer" gap="3")
      ArrowLeft(w="6" fill="gray-400 group-hover:white")
      span(color="gray-400 group-hover:white" text="md") BACK

  VList(h="full" pos="relative" v-if="$slots.content")
    slot(name="content")


</template>

<script lang="ts" setup>
import ArrowLeft  from '~/assets/icons/arrow-left.svg'
const arrowBackElement = ref()
const isBackHovered = useElementHover(arrowBackElement)

const { hideBackButton } = defineProps<{
  hideBackButton?: boolean,
}>()
</script>
<style>
</style>
