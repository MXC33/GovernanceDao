<template lang="pug">
div(flex-center="row" space-x="0.5" pos="absolute top-2 right-3")
  p(text="xs") {{ quantity }}
  p(text="2") x
</template>

<script lang="ts" setup>
defineProps<{
  quantity: number
}>()

</script>