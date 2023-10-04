<template lang="pug">
ClientOnly

  div(flex="~ col grow" p="x-2" min-h="0")
    SplashPopup(v-if="showAdPopup")

    img(w="full" h="full" src="~/assets/images/terminal/background.png" object="contain" pos="absolute" inset="0")

    div(flex="~ col grow" pos="relative" min-h="lg:0" space-y="6" overflow-y="auto" scrollbar="~ mc" p="2")

      TerminalUserGreeting()

      div(flex="~ lg:row col grow" min-h="0" grid="gap-4")

        TerminalEntries()

        TerminalCorps(min-h="50" display="lg:none")

        TerminalBlogs()

        div(h="1" w="full" display="md:none") &nbsp;

      TerminalCorps(min-h="48" display="!none !lg:flex")
  
</template>


<script lang="ts" setup>
const { showAdPopup } = useAds()

</script>

<style></style>