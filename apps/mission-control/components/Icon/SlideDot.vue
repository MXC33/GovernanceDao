<template lang="pug">
div(aspect="square" w="6")
  button(aspect="square" rounded="full" w="3" :bg="props.currentPage == props.pageNum ? 'mc-orange' : 'mc-orange_40'")
</template>

<script setup lang="ts">
  const props = defineProps<{
    pageNum: number
    currentPage: number
  }>()
</script>
