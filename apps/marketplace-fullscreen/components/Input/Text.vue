<template lang="pug">
div(frame="~")
  input(bg="transparent" p="3" outline="0" v-model="model" w="full" display="block")
</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>()
</script>