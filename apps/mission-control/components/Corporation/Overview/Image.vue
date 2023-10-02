<template lang="pug">
VList(b="1 $mc-accent" min-h="md:0 100" pos="relative md:(sticky top-0)")
  img(:src="`/corporations/${id}/image-banner.jpg`" object="cover" p="5" pos="absolute" inset="0" w="full" h="full")
</template>

<script lang="ts" setup>

const id = useActiveCorporation()

</script>