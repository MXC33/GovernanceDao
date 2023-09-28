<template lang="pug">
div(flex="~ col" items="center" bg="mc-black opacity-60" rounded="md" transition="all" pos="relative top--2 left--2" b="1 mc-orange_60 group-hover:mc-orange !on-selected:mc-orange !on-active:mc-mint" p="4 on-has-detail:(0 b-2)" h="24" self="start" :has-detail="hasDetail" :active="isActive" :selected="isSelected" z="0")
  div(inset="0" w="full" h="full" pos="absolute" backdrop="~ blur-md" z="-1" rounded="~ md" )
  slot

</template>


<script setup lang="ts">

defineProps<{
  hasDetail?: boolean
  isSelected?: boolean
  isActive?: boolean
}>()

</script>