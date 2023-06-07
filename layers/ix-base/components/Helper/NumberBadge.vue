<template lang="pug">
div()
  EllipseIcon(pos="absolute" w="6" z="1")
  div(pos="absolute" px="0.5" font="bold" z="2") {{ amount }} 
</template>

<script lang="ts" setup>
import EllipseIcon from '~/assets/images/icons/ellipse.svg'

defineProps<{
  amount: Number
}>()
</script>