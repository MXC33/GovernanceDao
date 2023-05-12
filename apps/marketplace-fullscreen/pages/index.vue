<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative")
  div Hello
</template>


<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})
</script>