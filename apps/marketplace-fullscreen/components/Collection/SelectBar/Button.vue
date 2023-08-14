<template lang="pug">
button(btn="~ secondary on-primary:primary " cut="bottom-right md b-gray-500 on-primary:b-ix-primary" :primary="!secondary" opacity="hover:80" w="lt-md:full")
  slot
</template>


<script setup lang="ts">
defineProps<{
  secondary?: boolean
}>()
</script>