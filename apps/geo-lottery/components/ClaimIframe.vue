<template lang="pug">
div(v-html="resp")
</template>

<script lang="ts" setup>
const { url } = defineProps<{
  url: string
}>()

const data = await fetch(url)
const resp = await data?.text()
</script>