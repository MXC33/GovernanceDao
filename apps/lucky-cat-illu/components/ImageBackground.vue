<template lang="pug">
img(pos="absolute" inset="0" w="full" h="full" object="cover" :src="src")
</template>

<script lang="ts" setup>
defineProps<{
  src: string
}>()
</script>