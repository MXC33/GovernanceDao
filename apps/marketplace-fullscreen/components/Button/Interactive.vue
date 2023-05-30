<template lang="pug">
ButtonSound.button-interactive(sound="sm" btn="~ primary" opacity="s-invalid:50" w="full" font="bold" transition="all" ref="button" pos="relative" pointer-events="s-loading:none s-invalid:none" :state="buttonState")
  Transition(name="slide-left")
    div(pos="absolute left-3" v-if="loading")
      LoadingBars.loading-bars(w="5" h="5")

  Transition(name="slide-shift-down" mode="out-in")
    GlitchText(:text="text" :hover="true" :is-hovered="isHovered" v-if="!loading")
    div(v-else) {{ $t('general.loading') }}

</template>
  
  
<script lang="ts" setup>
import LoadingBars from '~/assets/icons/loading-bars.svg'
const button = ref()
const isHovered = useElementHover(button)

const buttonState = computed(() => {
  if (loading)
    return 'loading'
  if (invalid)
    return 'invalid'
})

const { loading, invalid } = defineProps<{
  text: string,
  loading?: boolean,
  invalid?: boolean
}>()
</script>
  
<style>
.button-interactive {
  --transition-slide-offset: 0.5rem;
}

.loading-bars {
  --total-time: 800ms;
  --delay: 200ms;
}

.loading-bars path {
  animation-name: fade;
  animation-duration: var(--total-time);
  animation-fill-mode: alternate;
  animation-iteration-count: infinite;
}

.loading-bars path:nth-child(1) {
  animation-delay: 0s;
}

.loading-bars path:nth-child(2) {
  animation-delay: calc(-1 * (var(--total-time) - var(--delay)) * 2);
}

.loading-bars path:nth-child(3) {
  animation-delay: calc(-1 * (var(--total-time) - (var(--delay))));
}

@keyframes fade {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>