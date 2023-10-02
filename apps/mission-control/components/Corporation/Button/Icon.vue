<template lang="pug">
ActionIcon.corporation-menu-icon()
</template>

<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations'
import Fallback from '../Decoration/Fallback.vue';

const props = defineProps<{
  page: string,
  corporation: Corporation
  icon?: string
}>()

const iconPath = computed(() => props.icon ?? props.page)

const DefaultActionIcon = await import(`../../../assets/images/ui/corporations/actions/${iconPath.value}.svg?component`).catch(() => Fallback)

const ActionIcon = await import(`../../../assets/images/ui/corporations/actions/${iconPath.value}-${props.corporation}.svg?component`).catch(() => DefaultActionIcon)

</script>

<style lang="postcss">
.corporation-menu-icon path {
  fill: var(--corporation-over-accent-color)
}
</style>