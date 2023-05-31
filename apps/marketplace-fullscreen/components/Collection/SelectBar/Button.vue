<template lang="pug">
ButtonSound(sound="sm" btn="~ primary" cut="bottom-right")
  slot
</template>


<script setup lang="ts">
defineProps<{
  isPrimary?: boolean
}>()
</script>