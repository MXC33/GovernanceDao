<template lang="pug">
button(flex="~ " items="center" justify="center" frame="~ gray-400 hover:gray-300" min-h="12 on-banner:10" px="3 on-banner:2" :banner="isBanner")
  slot
</template>

<script lang="ts" setup>
defineProps<{
  isBanner?: boolean
}>()
</script>