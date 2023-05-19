<template lang="pug">
button(@click="emit('toggleFilter')" bg="transparent on-active:gray-600 hover:gray-800" p="2" transition="all" h="full" pos="relative" flex-shrink="0" aspect="square" min-w="0" items="center" flex="~" justify="center")
  slot
  
</template>
  

<script lang="ts" setup>
const emit = defineEmits(['toggleFilter']);

</script>