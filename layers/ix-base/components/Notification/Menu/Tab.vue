<template lang="pug">
button(text="gray-300 on-selected:ix-white hover:ix-white" b="b-1 transparent on-selected:ix-white" p="3" :selected="selected" transition="all")
  slot
  
</template>

<script lang="ts" setup>
defineProps<{
  selected: boolean
}>()
</script>