<template lang="pug">
HList(items="center" space-x="2" :color="color ? color : '$mc-accent'" text-shadow="$mc-accent")
  slot(name="icon" v-if="$slots.icon")
  div(v-else w="4" h="3" :bg="color ? color : '$mc-accent'" class="right-point")
  p(uppercase="~" translate-y="0.2")
    slot
</template>

<script setup lang="ts">
defineProps<{
  color?: string,
}>()
</script>

<style>
.right-point {
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
}
</style>