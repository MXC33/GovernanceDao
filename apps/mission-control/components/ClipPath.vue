<template lang="pug">
.clip(flex="~ col" :class="[`is-border-${modeColor}`]" transition="all")
  .clip-path(flex="~ col grow")

    slot

</template>

<script lang="ts" setup>
const props = defineProps<{
  isDisabled?: boolean
  isActive?: boolean
}>()

const modeColor = computed(() => {
  if (props.isDisabled)
    return 'gray'

  if (props.isActive)
    return 'mint'

  return 'orange'
})
</script>

<style>
.clip {
  --border-width: 1px;
  --border-color: #9f4431;

  /* transform: translateZ(1px); */
  filter:
    drop-shadow(var(--border-width) 0px 0px var(--border-color)) drop-shadow(calc(-1 * var(--border-width)) 0px 0px var(--border-color)) drop-shadow(0px var(--border-width) 0px var(--border-color)) drop-shadow(0px calc(-1 * var(--border-width)) 0px var(--border-color));
}

.clip.is-border-gray {
  --border-color: #4d4d4d;
}

.clip.is-border-mint {
  --border-color: var(--mc-mint);
}

.clip.is-border-orange:hover {
  --border-color: var(--mc-orange)
}

.clip-path {
  --clip-h: 4rem;
  --clip-v: 1.5rem;

  clip-path: polygon(0 0, calc(100% - var(--clip-h)) 0, calc(100% - var(--clip-h) / 1.66) calc(0% + var(--clip-v)), 100% calc(0% + var(--clip-v)), 100% 100%, 0 100%);
}
</style>