<template lang="pug">
HList(items="center" fill="white" w="full" space-x="2" color="white")
  Icon(w="6")
  span(font="bold" uppercase="~" text="md")
    slot()
</template>

<script setup lang="ts">
type Icon = 'offer' | 'listing' | 'description' | 'details' | 'traits'

const props = defineProps<{
  icon?: Icon
}>()

const Icon = await import(`~/assets/icons/${props.icon}.svg`).catch(() => '')


</script>
