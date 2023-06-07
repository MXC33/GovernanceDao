<template lang="pug">
div()
  EllipseIcon(pos="absolute" w="6")
  div(pos="absolute" )
    div(font="bold" p="0.5") {{ amount }} 
</template>

<script lang="ts" setup>
import EllipseIcon from '~/assets/images/icons/ellipse.svg'

defineProps<{
  amount: Number
}>()
</script>