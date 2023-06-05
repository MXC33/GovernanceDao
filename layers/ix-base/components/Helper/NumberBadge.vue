<template lang="pug">
div() {{ amount }} 
  EllipseIcon
</template>

<script lang="ts" setup>
import EllipseIcon from '~/assets/images/icons/ellipse.svg'

defineProps<{
  amount: Number
}>()
</script>