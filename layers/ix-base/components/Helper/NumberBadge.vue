<template lang="pug">
div(v-if="amount != 0 || amount != null" pos="relative")
  //-EllipseIcon(pos="absolute" w="6")
  //-div(pos="absolute" z="1" text="center" font="bold" pl="0.5") {{ amount }} 
  //-div(pos="absolute" z="1" pl="0.5")
  div(text="sm" font="bold").number-badge-icon {{ amount }} 
</template>

<style>
.number-badge-icon{
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center; 
  border-radius: 50%;
  font: bold;
  text-align: center;
}
</style>

<script lang="ts" setup>
import EllipseIcon from '~/assets/images/icons/ellipse.svg'

defineProps<{
  amount?: number
}>()
</script>