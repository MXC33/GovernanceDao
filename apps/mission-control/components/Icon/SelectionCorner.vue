<template lang="pug">
.selected-box(:class="[isOrange && 'is-orange']")
</template>

<script lang="ts" setup>
defineProps<{
  isOrange?: boolean
}>()
</script>

<style>
.selected-box.is-orange {
  --c: var(--mc-orange);
}

.selected-box {
  --b: 2px;
  /* thickness of the border */
  --c: var(--mc-mint);
  /* color of the border */
  --w: 7px;
  /* width of border */


  border: var(--b) solid transparent;
  /* space for the border */
  --g: #0000 90deg, var(--c) 0;
  background:
    conic-gradient(from 90deg at top var(--b) left var(--b), var(--g)) 0 0,
    conic-gradient(from 180deg at top var(--b) right var(--b), var(--g)) 100% 0,
    conic-gradient(from 0deg at bottom var(--b) left var(--b), var(--g)) 0 100%,
    conic-gradient(from -90deg at bottom var(--b) right var(--b), var(--g)) 100% 100%;
  background-size: var(--w) var(--w);
  background-origin: border-box;
  background-repeat: no-repeat;
}
</style>