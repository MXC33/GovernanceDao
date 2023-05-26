<template lang="pug">
VList()
  Transition(name="fade-slow" mode="in-out")
    HList(w="full" bg="ix-black" pos="sticky top-52" z="3" px="3 on-open:0" pb="3" space-x="4" :open="isOpen")
      CollectionFilterButton() NetEmpire
      CollectionFilterButtonClearAll()

  div(grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" divide-x="0.5" w="full")
    slot

</template>

<script lang="ts" setup>
defineProps<{
  isOpen?: boolean
}>()
</script>