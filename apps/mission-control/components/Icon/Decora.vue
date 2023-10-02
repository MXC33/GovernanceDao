<template lang="pug">
div(pos="absolute" inset="0" overflow="hidden" pointer-events="none")
  img(:src="DecoraBorder" pos="absolute top-45 bottom-0 left-1" w="2")
  img(:src="DecoraBorder" pos="absolute top-45 bottom-0 right-1" w="2")
  //- img(:src="DecoraBottom" pos="absolute bottom-4 right-10" w="45" v-if="activeGameTab !== 'inventory' && activeGameTab !== 'bio'")
  //- img(:src="DecoraPlayerBottom" pos="absolute bottom-4 right-15" w="45" v-if="activeGameTab == 'bio'")
</template>

<script setup lang="ts">
import DecoraBorder from '~/assets/images/ui/build/decora-border.png'
import DecoraBottom from '~/assets/images/ui/build/decora-bottom.png'
import DecoraPlayerBottom from '~/assets/images/ui/user/decora-bottom.png'

// const { activeGameTab } = useGame()
</script>
