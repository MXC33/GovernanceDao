<template lang="pug">
#app.antialiased(font="foundry" bg="ix-black" color="white" text="sm lg:md" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    NuxtLoadingIndicator(color="rgb(255, 102, 71)")

    NuxtPage()

</template>

<script setup lang="ts">
import 'vue3-easy-data-table/dist/style.css';

const { data, execute } = useAsyncDataState('ix-api', async () => 'test')
await execute()

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
body,
html {
  background: #000;
}
</style>