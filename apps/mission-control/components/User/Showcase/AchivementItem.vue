<template lang="pug">
div(pos="relative" class="shadow-mint")
  p(text="xs mc-orange" pos="absolute top-2 left-2") {{ props.title }}
  div(w="full" bg="mc-mint_20" h="20")
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title: string
  }>()

</script>

<style>
.shadow-mint {
  box-shadow: 0 0 1px #84D4BC, 0 0 10px #84D4BC;
  /* animation: blink 0.7s infinite alternate; */
}

@keyframes blink {
  100% {
    box-shadow: 0 0 3px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #84D4BC,
      0 0 10px #0ba9ca, 0 0 30px #84D4BC;
  }
}

</style>