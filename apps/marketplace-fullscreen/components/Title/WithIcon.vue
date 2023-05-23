<template lang="pug">
HList(items="center" fill="white" w="full" space-x="2" color="white")
  Icon(w="4" flex-shrink="0")
  span(font="bold" uppercase="~" text="md")
    slot()
</template>

<script setup lang="ts">
type Icons = 'offer' | 'listing' | 'description' | 'details' | 'traits'

const props = defineProps<{
  icon?: Icons
}>()

const Icon = await import(`../../assets/icons/${props.icon}.svg?component`).catch(() => '')
</script>
