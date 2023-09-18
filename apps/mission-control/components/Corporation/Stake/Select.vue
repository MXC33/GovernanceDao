<template lang="pug">
CorporationActionSelect(:page="page")

  CorporationButton(:page="page" :corporation="id" v-for="page in pages")
</template>

<script lang="ts" setup>
const id = useActiveCorporation()

defineProps<{
  pages: string[]
  page: string
}>()

</script>
