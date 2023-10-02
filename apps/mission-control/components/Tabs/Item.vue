<template lang="pug">
ButtonSound(flex="~ row shrink-0"  justify="start" items="start" p="2 md:x-3" min-h="12" btn="~ on-active:tab-active tab" text="sm" pos="relative" overflow="hidden" :active="active" group :style="tabStyle" sound="md" cut="top-right b-mc-orange_60 on-active:b-mc-mint_80")

  transition(name="fade")
    IconCircuitBg(:isActive="true" :is-small="true" :is-animated="true" v-if="active" opacity="30")

  span(font="bold")
    slot
</template>

<script setup lang="ts">
const props = defineProps<{
  active: boolean,
  tabSize: number,
  isLast?: boolean
}>()


const tabStyle = computed(() => ({ width: `calc(${props.tabSize}% - ${props.isLast ? '0rem' : '0.5rem'})` }))
</script>