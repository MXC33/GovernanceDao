<template lang="pug">
div(bg="transparent on-active:gray-600" :active="active" p="2" transition="all")
  slot
  
</template>
  

<script lang="ts" setup>
defineProps<{
  active: boolean
}>()

</script>