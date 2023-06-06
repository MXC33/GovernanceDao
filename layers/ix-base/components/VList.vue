<template lang="pug">
div(flex="~ col fold-row" :state="fold")
  slot
  
</template>

<script lang="ts" setup>
defineProps<{
  fold?: 'md' | 'lg',
}>()
</script>