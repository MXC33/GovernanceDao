<template lang="pug">
ButtonSound.button-interactive(sound="sm" class="pink-btn" opacity="s-invalid:50" transition="all" ref="button" pos="relative"
  bg="hover:gray-300" p="x-9 sm:x-10 md:x-12 y-3" color="$mc-whitenew" font="bold" uppercase="~" text="sm sm:base" rounded="full" h="12"
  pointer-events="s-loading:none s-invalid:none" :state="buttonState" v-if="value == 'pink'" v-bind="$attrs")
  Transition(name="slide-left")
    span(pos="absolute left-3" v-if="loading")
      LoadingBars.loading-bars(w="4" h="4")

  Transition(name="slide-shift-down" mode="out-in")
    GlitchText(:text="text" :hover="true" :is-hovered="isHovered" v-if="!loading")
    span(v-else) {{ $t('general.loading') }}
ButtonSound.button-interactive(sound="sm" opacity="s-invalid:50" transition="all" ref="button" pos="relative"
  bg="transparent hover:(white opacity-10) " p="x-9 sm:x-10 md:x-12 y-3" color="$mc-whitenew"  border-color="$mc-whitenew" border="1" h="12"  font="bold" uppercase="~" text="sm sm:base" rounded="full"
  pointer-events="s-loading:none s-invalid:none" :state="buttonState" v-if="value == 'white'" v-bind="$attrs")
  Transition(name="slide-left")
    span(pos="absolute left-3" v-if="loading")
      LoadingBars.loading-bars(w="4" h="4")

  Transition(name="slide-shift-down" mode="out-in")
    GlitchText(:text="text" :hover="true" :is-hovered="isHovered" v-if="!loading")
    span(v-else) {{ $t('general.loading') }}

ButtonSound.button-interactive(sound="sm" opacity="s-invalid:50" transition="all" ref="button" pos="relative"
  bg="ix-ne hover:(ix-ne opacity-60) " p="x-9 sm:x-10 md:x-12 y-3" color="$mc-whitenew"  border-color="$mc-whitenew" h="12"  font="bold" uppercase="~" text="sm sm:base" rounded="full"
  pointer-events="s-loading:none s-invalid:none" :state="buttonState" v-if="value == 'red'" v-bind="$attrs")
  Transition(name="slide-left")
    span(pos="absolute left-3" v-if="loading")
      LoadingBars.loading-bars(w="4" h="4")

  Transition(name="slide-shift-down" mode="out-in")
    GlitchText(:text="text" :hover="true" :is-hovered="isHovered" v-if="!loading")
    span(v-else) {{ $t('general.loading') }}

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
  invalid?: boolean,
  value: string
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
