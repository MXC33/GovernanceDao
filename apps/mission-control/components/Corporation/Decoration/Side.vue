<template lang="pug">
div(display="lt-md:none" flex="~ row" justify="between" items="center" pos="absolute" pointer-events="none" inset="0" z="1" px="2 md:3 lg:11" py="10")
  DecorationX.corporation-decoration(max-w="8" w="full" max-h="full" v-if="!hideL")

  div(flex="grow")

  DecorationX.corporation-decoration.is-right(max-w="8" w="full" max-h="full" v-if="!hideR")

</template>

<script lang="ts" setup>
import FallbackVue from './Fallback.vue';
defineProps<{
  hideL?: boolean,
  hideR?: boolean
}>()
const id = useActiveCorporation()

const DecorationX = await import(`../../../assets/images/ui/corporations/${id.value}/decro-x.svg?component`).catch(() => FallbackVue)

</script>

<style lang="postcss">
.corporation-decoration path[fill] {
  fill: var(--corporation-accent-color);
}

.corporation-decoration path[stroke] {
  stroke: var(--corporation-accent-color);
}

.corporation-decoration.is-right {
  transform: rotateY(180deg)
}
</style>