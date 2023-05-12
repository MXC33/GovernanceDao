<template lang="pug">
img(:src="src")
</template>

<script lang="ts" setup>
defineProps<{
  src: string,
}>()

</script>