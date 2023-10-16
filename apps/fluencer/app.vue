<template lang="pug">
#app.antialiased(font="gridnik" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    NuxtLoadingIndicator(color="#84D4BC")

    NuxtPage()

    div#takeover

    //- CookieBot(:id="cookieBotId")
</template>

<script setup lang="ts">
const { setupOnMounted } = useAppSetup()

useHead({
  title: "Fluencer | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})

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
