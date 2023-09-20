<template lang="pug">
div.hazard(:class="className" bg="gray-800" :justify="alignment" items="center" pos="relative" display="none md:flex" uppercase="~" text="xs lg:sm" p="x-2 md:x-4 y-2" font="bold")
  slot
</template>

<script lang="ts" setup>
const props = defineProps<{
  isLight?: Boolean
  alignment: string
  isTransparentLight?: Boolean
}>()

const className = computed(() =>
  props.isLight ? 'is-light' : (props.isTransparentLight ? 'is-transparent-light' : '')
)

</script>

<style>
.hazard {
  --hazard-width: 1.5%;
  color: rgb(var(--corporation-text-color));

  background:
    repeating-linear-gradient(-45deg,
      rgba(0, 0, 0, 0.125), transparent, rgba(0, 0, 0, 0.125) 25%) bottom right/200% 200% #000;

  background-image: repeating-linear-gradient(-45deg,
      transparent,
      transparent var(--hazard-width),
      rgb(48, 48, 48, 1) var(--hazard-width),
      rgb(48, 48, 48, 1) calc(var(--hazard-width) * 2));

  animation: bg_roll 10s linear infinite;

}

.hazard.is-light {
  background-image: repeating-linear-gradient(-45deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9) var(--hazard-width),
      rgb(255, 255, 255, 0.8) var(--hazard-width),
      rgb(255, 255, 255, 0.8) calc(var(--hazard-width) * 2));
}

.hazard.is-transparent-light {
  background: repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.125), transparent, rgba(0, 0, 0, 0.125) 25%) bottom right/200% 200% #0000;
  background-image: repeating-linear-gradient(-45deg, transparent, transparent var(--hazard-width), #f9f9f93b var(--hazard-width), #f9f9f942 calc(var(--hazard-width) * 2));
}

/* .hazard.is-transparent-light p{
    background: #f9f9f9a3;
    margin-left: 20px;
    color: black;
    padding: 0 0.5rem;
} */

@keyframes bg_roll {
  100% {
    background-position: top left;
  }
}
</style>