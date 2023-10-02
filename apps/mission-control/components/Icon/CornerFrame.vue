<template lang="pug">
.button-corner(:class="'is-' + props.cornerColor")

  slot
</template>


<script lang="ts" setup>
const props = defineProps<{
  cornerColor: string
}>()
</script>

<style>
.button-corner {
  --b: 1px;
  /* thickness of the border */
  /*  --c:rgba(132, 212, 188, 1); color of the border */
  --w: 6px;
  /* width of border */


  border: var(--b) solid transparent;
  background-origin: border-box;
  background-repeat: no-repeat;
  /* space for the border */
  --g: #0000 90deg, var(--c) 0;
  background:
    conic-gradient(from 90deg at top var(--b) left var(--b), var(--g)) 0 0,
    conic-gradient(from 180deg at top var(--b) right var(--b), var(--g)) 100% 0,
    conic-gradient(from 0deg at bottom var(--b) left var(--b), var(--g)) 0 100%,
    conic-gradient(from -90deg at bottom var(--b) right var(--b), var(--g)) 100% 100%;
  background-size: var(--w) var(--w);
}

.button-corner.is-mc-mint {
  --c: rgba(132, 212, 188);
}

.button-corner.is-corporation-eternalab {
  --c: rgba(0, 160, 240);
}

.button-corner.is-corporation-newlands {
  --c: rgba(255, 230, 10);
}

.button-corner.is-corporation-gws {
  --c: rgba(255, 255, 255);
}

.button-corner.is-corporation-y-space {
  --c: rgba(95, 190, 135);
}
</style>