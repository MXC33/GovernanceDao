<template lang="pug">
fieldset(b="1" p="x-6 y-3" w="full")
  legend(uppercase="~" px="2") {{ title }}
  slot
</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>