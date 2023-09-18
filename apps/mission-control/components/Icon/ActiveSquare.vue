<template lang="pug">
div(:style="{ width }" aspect="square" :bg="isActive ? 'mc-mint' : 'mc-orange'" :class="isActive ? 'glow-mint' : 'glow-orange'")

</template>

<script setup lang="ts">
const { size } = defineProps<{
  isActive: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

const width = computed(() => {
  if (size == 'sm')
    return '0.5rem'

  if (size == 'lg')
    return '1rem'

  else
    return '0.75rem'
})

</script>