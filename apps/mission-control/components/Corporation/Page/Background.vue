<template lang="pug">
Transition(name="fade")
  img(:src="`/corporations/${id}/background.jpg`" inset="0" pos="absolute" opacity="50" z="0" object="cover" h="full" w="full")

</template>

<script lang="ts" setup>
const id = useActiveCorporation()

</script>

<style>
.corporation-bg-texture {
  background-image: url('~/assets/images/ui/corporations/texture.png');
  background-size: 262px;
  background-repeat: repeat;
}
</style>