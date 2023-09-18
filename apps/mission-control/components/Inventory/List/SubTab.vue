<template lang="pug">
button(uppercase="~" h="full" w="full" color="!on-active:mc-mint mc-orange_60 hover:mc-orange" transition="all" text-shadow="on-active:mc-mint hover:mc-orange" b="mc-orange_20" :active="isActive" text="xs lg:sm") {{ title }}
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  isActive: boolean
}>()
</script>