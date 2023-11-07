<template lang="pug">
#app.antialiased(font="gridnik" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow" min-h="100vh")

  NuxtLayout()
    NuxtLoadingIndicator(color="rgb(255, 102, 71)")
    NuxtPage()

</template>

<script setup lang="ts">
const { fetchHeaderData } = useSiteHeader()

const { refresh: fetchHeader } = fetchHeaderData()
await fetchHeader()
const { setupPaintWorker } = useAppSetup()

onMounted(() => {
  setupPaintWorker()
})

useHead({
  title: "Mission Control",
  meta: [
    {
      name: "X-UA-Compatible",
      content: "IE=Edge"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes"
    }
  ],

  link: [
    { rel: "icon", href: "/IX-icon.png" }
  ]
});

</script>  
<style>
html {
  background: var(--ix-black);
}

body {
  font-variant-ligatures: no-common-ligatures;
}

body.is-fixed-height {
  overflow: hidden;
  height: 100%;
}

.no-scrollbar {
  scrollbar-width: none
}

.no-scrollbar::-webkit-scrollbar {
  display: none
}
</style>