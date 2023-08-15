<template lang="pug">
div(v-html="item" h="10" w="10")
</template>
<script lang="ts" setup>
const {item} = defineProps<{
  item: string
}>()
</script>