<template lang="pug">
div(grid="~ cols-8 gap-1" uppercase="~")
  InfoHeader(grid="col-span-4") {{ title }}
  InfoHeader(grid="col-span-4") {{ value }}
</template>

<script lang="ts" setup>
defineProps<{
  title: string,
  value: string | number,
}>()
</script>