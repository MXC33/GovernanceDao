<template lang="pug">
HList()
  slot(name="infotext")
  
</template>

<script lang="ts" setup>
interface Cords {
  xPos: number
  YPos: number
}

defineProps<{
  cords: Cords
}>()
</script>