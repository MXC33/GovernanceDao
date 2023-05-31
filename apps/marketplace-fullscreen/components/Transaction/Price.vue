<template lang="pug">
span {{ displayedValue }}

</template>

<script lang="ts" setup>
const { value } = defineProps<{
  value: number
}>()

const displayedValue = computed(() => !value ? '--' : value)

</script>