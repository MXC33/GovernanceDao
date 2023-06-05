<template lang="pug">
div() {{ amount }}
</template>

<script lang="ts" setup>
defineProps<{
  amount: Number
}>()
</script>