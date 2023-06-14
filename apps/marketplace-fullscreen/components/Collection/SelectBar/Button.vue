<template lang="pug">
button(btn="~ on-primary:primary secondary md" cut="bottom-right" :primary="!secondary" opacity="hover:80")
  slot
</template>


<script setup lang="ts">
defineProps<{
  secondary?: boolean
}>()
</script>