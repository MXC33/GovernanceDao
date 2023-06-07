<template lang="pug">
div()
  EllipseIcon(pos="absolute" w="6")
  div(pos="absolute" font="bold") {{ amount }} 
</template>

<script lang="ts" setup>
import EllipseIcon from '~/assets/images/icons/ellipse.svg'

defineProps<{
  amount: Number
}>()
</script>