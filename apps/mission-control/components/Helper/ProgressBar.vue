<template lang="pug">
div(w="full" bg="$mc-accent-40" h="3" p="1")
  div(bg="$mc-accent" h="full" :style="width" transition="width")
</template>

<script lang="ts" setup>
const props = defineProps<{
  progress: number,
}>()

const width = computed(() => ({
  width: `${props.progress}%`
}))

</script>
