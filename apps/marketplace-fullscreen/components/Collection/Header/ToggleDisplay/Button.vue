<template lang="pug">
button(bg="transparent on-active:gray-600 hover:gray-800" :active="active" p="2" transition="all")
  slot
  
</template>
  

<script lang="ts" setup>
defineProps<{
  active: boolean
}>()

</script>