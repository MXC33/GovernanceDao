<template lang="pug">
div.animation-bg-wrapper(w="full" h="full" z="-2" pos="absolute" :class="[animationColor]")
  div(:style="width" my="0.3" ml="0.3" p="1" pos="relative" h="full")
    div(pos="absolute" inset="0" bg="gray-400 opacity-50 on-done:(mc-mint opacity-10)" :done="isFinished")
    div.animated-bg-progress(opacity="30" pos="absolute" inset="0")
</template>

<script lang="ts" setup>
const props = defineProps<{
  progress: number,
}>()

const width = computed(() => ({
  width: `${props.progress}%`
}))

const animationColor = computed(() => props.progress == 100 ? 'is-mint' : '')

const isFinished = computed(() => props.progress == 100)

</script>

<style>
.animation-bg-wrapper {
  --animation-col-1: rgba(255, 255, 255, 0);
  --animation-col-2: white;
}

.animation-bg-wrapper.is-mint {
  /* --animation-col-1: var(--mc-mint-20); */
  --animation-col-2: var(--mc-mint);
}

.animated-bg-progress {
  background: repeating-linear-gradient(90deg, var(--animation-col-1), var(--animation-col-2), var(--animation-col-1));
  background-repeat: repeat-x;
  height: 100%;
  position: absolute;
  background-size: 400% 100%;
  animation: ABgProgress 3s linear infinite;
}

@keyframes ABgProgress {
  0% {
    background-position: 100%
  }

  100% {
    background-position: -33%
  }
}
</style>