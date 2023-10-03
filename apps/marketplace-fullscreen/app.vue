<template lang="pug">
#app.antialiased(font="gridnik" text="base" bg="ix-black" color="white" ref="app" overscroll="none" flex="~ col grow")
  NuxtLayout()
    NuxtLoadingIndicator(color="#84D4BC")

    NuxtPage()

    PopupList()

    div#infobox(:style="values" z="400" pos="absolute")

    div#takeover

    SnackbarList()

    CookieBot(:id="cookieBotId")

    //- PopupBase(v-if="isSwapVisible" @close="isSwapVisible = false" :disable-default-close="true")
    //-   template(#header) {{ $t(`marketplace.navigation.buy.swap.title`)}}
    //-   template(#default)
    //-     VList(w="full" justify="center" items="center" )
    //-       iframe(src="https://ix.foundation/lefi" w="full" h="full" min-h="118")


  component(is="style").
    :root { 
      --page-header-offset: {{ pageHeaderOffset }}px;
      --filter-header-offset: {{ filterHeaderOffset }}px;
    }

</template>

<script setup lang="ts">

useHead({
  title: "Marketplace | PlanetIX",
  script: [
    { src: '/global.js' },
  ]
})

const { setupOnMounted } = useAppSetup()
const cookieBotId = "2f5a2e80-772d-413d-9cc6-1edcc72e0de8"

const { pageHeaderOffset, filterHeaderOffset } = useStickyOffsets()

onBeforeMount(() => {
  setupOnMounted()
})
const { x: xpos, y: ypos } = useMouse()

const values = computed(() => {

  const xPos = xpos.value - 38
  const yPos = ypos.value - 190

  return {
    top: `${yPos}px`,
    left: `${xPos}px`
  }
})

</script>

<style>
body,
html {
  background: #0C0C0C;
}

/* Scroll bar stylings */
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #636363;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #636363;
}

.no-scrollbar {
  scrollbar-width: none
}

.no-scrollbar::-webkit-scrollbar,
.no-scrollbar ::-webkit-scrollbar {
  display: none
}

.no-scrollbar::-webkit-scrollbar-thumb,
.no-scrollbar ::-webkit-scrollbar-thumb {
  display: none
}

.no-scroll {
  overflow: hidden;
}
</style>
