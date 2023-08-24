<template lang="pug">
VList(justify="center" items="center" aspect="2/3" bg="black opacity-40" ref="mediaElement" cursor="pointer" group)
  HelperSkeleton(aspect="square" w="full" pos="relative")

  VList(flex-grow="1" space-y="3" w="full" p="6")
    HelperSkeleton(w="100%" h="6")
    HelperSkeleton(w="70%" h="6")
    div(flex-grow="1")
    HelperSkeleton(w="40%" h="6")
      
</template>

<script lang="ts" setup>
</script>

<style></style>

