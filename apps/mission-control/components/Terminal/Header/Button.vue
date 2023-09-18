<template lang="pug">
div(:bg="isActive ? 'mc-orange_80' : 'mc-orange_10 hover:mc-orange_20'" p="3" b="mc-orange_40" uppercase="~" cursor="pointer" tracking="widest") 
  slot
</template>


<script lang="ts" setup>
defineProps<{
  isActive?: boolean
}>()
</script>

<style>
</style>