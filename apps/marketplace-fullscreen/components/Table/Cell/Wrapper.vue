
<template lang="pug">
HList(p="y-4" whitespace="nowrap" pos="relative" items="center" w="full" min-w="0")
  div(b="b-1 gray-600" pos="absolute bottom-0 top-0 left-0 right-0" mx="lg:-6 -4" bg="gray-900")

  HList(pos="relative" w="full" min-w="0")
    slot

      
</template>

<script setup lang="ts">
</script>

<style scoped></style>