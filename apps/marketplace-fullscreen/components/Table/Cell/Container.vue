<template lang="pug">
HList(items="center" justify="start on-end:end" :end="alignEnd")
  slot

</template>

<script lang="ts" setup>
defineProps<{
  alignEnd?: boolean
}>()
</script>