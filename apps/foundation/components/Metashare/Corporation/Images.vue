<template lang="pug">
div
  img(:src="src" alt="Metashare Corporation Image")
</template>
  
<script lang="ts" setup>
const { src } = defineProps<{
  src: string
}>();
</script>