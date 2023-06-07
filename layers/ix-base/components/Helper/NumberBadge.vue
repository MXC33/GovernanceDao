<template lang="pug">
div()
  EllipseIcon(pos="absolute" w="6" z="1")
  //-div(font="bold").number-badge-icon {{amount}}
  div(pos="absolute" z="2" font="bold")
    div(p="0.5" ) {{ amount }} 
    //-div().number-badge-icon {{ amount }} 
    
</template>

<style>
.number-badge-icon{
  position: absolute;
  width: 25px;
  height: 25px;
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
  amount: Number
}>()
</script>