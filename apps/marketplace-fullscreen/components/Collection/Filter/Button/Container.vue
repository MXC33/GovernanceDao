<template lang="pug">
ClientOnly
  Transition(name="fade-slow" mode="in-out")
    HList(w="full" bg="ix-black" pos="sticky top-52" z="3" px="3 on-open:0" flex-wrap="~" pb="3" space-x="4")
      CollectionFilterButton() netempire
      CollectionFilterButtonClearAll()

</template>

<script lang="ts" setup>

</script>