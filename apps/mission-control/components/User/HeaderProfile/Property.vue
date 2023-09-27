<template lang="pug">
div(flex="~ row" items="center" min-w="0" text="truncate")
  div(w="1" h="1" mx="1" :bg="color" flex="shrink-0")
  div(:color="color" max-w="full") 
    p(truncate="~")
      slot
</template>

<script setup lang="ts">
defineProps<{
  color: string
}>()
</script>