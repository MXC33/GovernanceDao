<template lang="pug">
button(flex="~ " items="center" justify="center" frame="~ gray-400 hover:gray-300" wh="10 on-lg:12" :lg="lg")
  slot
</template>

<script lang="ts" setup>
defineProps<{
  lg?: boolean
}>()
</script>