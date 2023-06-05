<template lang="pug">
div(flex="~ row fold-col" :state="fold")
  slot
  
</template>

<script lang="ts" setup>
defineProps<{
  fold?: 'md' | 'lg',
}>()
</script>