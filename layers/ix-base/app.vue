<template lang="pug">
HList()
  div(bg="ix-primary opacity-30" btn="~" font="foundry" cut="bottom-right b-red-400") IX UI
</template>

<script setup lang="ts">

const {execute: fetchHeaderData } = useHeaderData()

await fetchHeaderData()


onMounted(async () => {
  //@ts-ignore
  const isPaintSupported = !!CSS.paintWorklet

  if (isPaintSupported) {
    //@ts-ignore
    CSS.paintWorklet.addModule('/paint/border.js');
  }
  document.body.classList.toggle('is-paint-supported', isPaintSupported)
  document.body.classList.toggle('is-not-paint-supported', !isPaintSupported)
})


</script>

<style>
:root {
  --content-drawer-bg-color: var(--ix-black)
}
</style>
