<template lang="pug">
VList()
  CollectionFilterButtonContainer()

  div(grid="~ cols-2 md:cols-3 lg:cols-4 2xl:cols-5" divide-x="0.5" w="full")
    slot

</template>

<script lang="ts" setup>
// defineProps<{
//   isOpen?: boolean
// }>()
</script>