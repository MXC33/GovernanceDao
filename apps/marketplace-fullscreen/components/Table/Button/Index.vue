<template lang="pug">
ButtonSound(sound="sm" btn="~ secondary on-primary:primary" :primary="isPrimary" cut="bottom-right md"  w="10" h="6")
  slot
</template>


<script setup lang="ts">
defineProps<{
  isPrimary?: boolean
}>()
</script>