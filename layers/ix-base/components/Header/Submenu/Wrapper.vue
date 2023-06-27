<template lang="pug">
VList(pos="absolute top-full left-0 on-right:(left-auto right-0)" mt="3" z="3" b="1 gray-400" divide-y="1" w="full" bg="black" :right="alignRight") 
  slot
</template>

<script lang="ts" setup>
defineProps<{
  alignRight?: boolean
}>()

</script>