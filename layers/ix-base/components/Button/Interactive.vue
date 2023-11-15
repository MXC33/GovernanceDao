<template lang="pug">
button.button-interactive(btn="~ primary s-loading:loading" opacity="s-invalid:50" w="full" font="bold" transition="all" ref="button" pos="relative" pointer-events="s-loading:none s-invalid:none" :state="buttonState" overflow="hidden")
  div.animation.slide-left-right(v-if="loading")

  GlitchText(:text="renderText" :key="renderText" :hover="true" :is-hovered="isHovered" whitespace="nowrap" pos="relative")

  

</template>
  
  
<script lang="ts" setup>
const { t } = useI18n()
const button = ref()
const isHovered = useElementHover(button)

const renderText = computed(() => {
  if (loading) {
    return loadingText ?? t('general.loading')
  }

  return text
})

const buttonState = computed(() => {
  // return 'loading'
  if (loading)
    return 'loading'
  if (invalid)
    return 'invalid'
})

const { loading, invalid, loadingText, text } = defineProps<{
  text: string,
  loading?: boolean,
  invalid?: boolean
  isShared?: boolean
  loadingText?: string
}>()
</script>
  
<style>
.button-interactive {
  --transition-slide-offset: 0.5rem;
}

.button-interactive .animation {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  animation-name: slide-left-right;
  animation-timing-function: ease-out;
  animation-duration: 1s;
  animation-fill-mode: alternate;
  animation-iteration-count: infinite;
}

.button-interactive .animation:after {
  content: '';
  display: block;
  width: 20%;
  height: 100%;
  opacity: 0.5;
  @apply bg-ix-primary;
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