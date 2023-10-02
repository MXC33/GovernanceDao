<template lang="pug">
component.circuit-background(:is="component" :min-w="isSmall ? '50' : '100'" :min-h="isSmall ? 'full' : '100'" pos="absolute" inset="0" :class="[isActive ? 'is-active' : '', isSmall ? 'is-small' : 'is-large', isAnimated && !isMobile ? 'is-animated' : 'is-static']")
</template>

<script setup lang="ts">
import CircuitBackground from '~/assets/images/ui/circuit.svg'
import CircuitBackgroundSmall from '~/assets/images/ui/circuit-small.svg'
const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint()

const props = defineProps<{
  isActive: boolean,
  isSmall?: boolean,
  isAnimated?: boolean
}>()

const component = computed(() => {
  if (props.isSmall)
    return CircuitBackgroundSmall
  else
    return CircuitBackground
})

</script>

<style>
.circuit-background.is-animated g {
  stroke: rgba(255, 102, 71, 0.2);
  stroke-dasharray: 300;
  stroke-width: 2;
  fill: transparent;
  transition: all 200ms;
}

[group=""]:hover .circuit-background.is-animated g,
.circuit-background.is-animated.is-active g {
  animation: dash 20s linear infinite alternate;
}

[group=""]:hover .circuit-background.is-animated.is-large g,
.circuit-background.is-animated.is-active.is-large g {
  stroke-dasharray: 200;
  animation: dash 40s linear infinite alternate;

}

.circuit-background.is-static.is-active g {
  fill: rgba(132, 212, 188, 0.4);
}

.circuit-background.is-animated.is-active g {
  stroke: rgba(132, 212, 188, 0.4);
}

@keyframes dash {
  to {
    stroke-dashoffset: 1500;
  }
}
</style>