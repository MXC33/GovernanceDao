<template lang="pug">
div(flex="~ col grow" min-h="0" pos="relative")
  Inventory(:standalone="true")
</template>


<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})
</script>