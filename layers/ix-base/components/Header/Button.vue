<template lang="pug">
ButtonSound(font="druk" sound="md" display="block" uppercase="~" color="on-active:ix-orange" cursor="pointer" opacity="hover:80" transition="all" text="lg" :active="isActive") 
  slot
  
</template>


<script lang="ts" setup>
defineProps<{
  isActive?: boolean
}>()
</script>

<style></style>