<template lang="pug">
div(b="1 $mc-accent-40" flex="~ grow" items="center" p="2")
  slot
</template>

<script lang="ts" setup>
defineProps<{
  noStyles?: boolean
}>()
</script>
