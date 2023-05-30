<template lang="pug">
ButtonSound(sound="sm" bg="gray-400 hover:gray-300 on-primary:(ix-primary hover:ix-ne)" :primary="isPrimary" cut="bottom-right sm" px="6" py="3" uppercase="~" font="bold")
  slot
</template>


<script setup lang="ts">
defineProps<{
  isPrimary?: boolean
}>()
</script>