<template lang="pug">
ButtonSound(font="druk" sound="md" display="block" uppercase="~" :color="isActive ? 'mc-orange' : ''" cursor="pointer" opacity="hover:80" transition="all" text="lg") 
  slot
</template>


<script lang="ts" setup>
defineProps<{
  isActive?: boolean
}>()
</script>

<style>

</style>