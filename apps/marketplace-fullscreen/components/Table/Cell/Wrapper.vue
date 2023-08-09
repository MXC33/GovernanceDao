
<template lang="pug">
HList(p="y-2" whitespace="nowrap" pos="relative" items="center" w="full" min-w="0")
  div(b="b-1 gray-600" pos="absolute bottom-0 top-0 left-0 right-0" mx="lg:-6 -4" )

  HList(pos="relative" w="full" min-w="0" justify="on-end:end" :end="alignEnd")
    slot

      
</template>

<script setup lang="ts">
defineProps<{
  alignEnd?: boolean
}>()
</script>

<style scoped></style>