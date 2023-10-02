<template lang="pug">
CorporationTableRowContainer()
  template(#left) {{ name }}

  template(#right) {{ value }}

</template>

<script lang="ts" setup>
defineProps<{
  name: string,
  value: string
}>()

</script>