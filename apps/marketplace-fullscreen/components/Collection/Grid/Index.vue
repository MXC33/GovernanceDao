<template lang="pug">
VList()
  Transition(name="slide-left")
    CollectionFilterButtonContainer(:is-open="isOpen")

  div(grid="~ cols-2 md:(cols-3 on-open:cols-2) lg:(cols-4 on-open:cols-3) 2xl:(cols-5 on-open:cols-4)" :open="isOpen" w="full")
    slot

</template>

<script lang="ts" setup>
defineProps<{
  isOpen: boolean
}>()

</script>