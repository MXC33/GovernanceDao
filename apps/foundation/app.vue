<template lang="pug">
#app.antialiased(font="gridnik" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    NuxtLoadingIndicator(color="#84D4BC")

    NuxtPage()

    div#takeover

    //- CookieBot(:id="cookieBotId")
</template>

<script setup lang="ts">
const { setupOnCreated, setupOnMounted } = useAppSetup()

useHead({
  title: "Foundation | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})

setupOnCreated()

onMounted(() => {
  setupOnMounted()
})


</script>

<style>
body,
html {
  background: #0C0C0C;
}
</style>
