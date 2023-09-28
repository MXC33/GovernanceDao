<template lang="pug">
HList(items="center" justify="start" space-x="1" uppercase="~" fill="white" w="full")
  slot(name="icon" v-if="$slots.icon")

  Icon(v-else h="10px" w="auto" flex-shrink="0")

  VList(translate-y="0.075em" max-w="full" min-w="0")
    slot
</template>

<script setup lang="ts">
type Icon = 'half-circle' | 'cut-corner' | 'pointer' | 'prompt'

const props = defineProps<{
  icon?: Icon
}>()

const Icon = await import(`../../assets/images/ui/icons/${props.icon}.svg?component`).catch(() => '')


</script>
