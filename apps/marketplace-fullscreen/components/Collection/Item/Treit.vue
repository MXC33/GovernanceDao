<template lang="pug">
div.treit_wrapper
  h2 {{type}}
  h3 {{name}}
  p(v-if="value" ) {{value}}
</template>

<script lang="ts" setup>

const props = defineProps<{
  type: string
  name: string
  value?: string
}>()

</script>

<style scoped>

</style>