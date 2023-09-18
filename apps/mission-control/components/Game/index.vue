<template lang="pug">
VList(flex-grow="1" h="full" pos="relative" pointer-events="none")

  Transition(name="fade")
    GameHeader(pos="sticky top-0" v-if="isMounted")

  div(flex="grow md:grow-0" pointer-events="none")


  HList#infobox(:style="values" z="9999" pos="absolute")

  GameTools(v-if="gameMenu == null")

  ClientOnly()
    GameMenus()
    NotificationsReboot(v-if="isClaimAndUnstakeOpen")

</template>

<script lang="ts" setup>
const { setupTileListeners } = useTiles()
const { isClaimAndUnstakeOpen } = useClaimAndUnstakeAll()

const gameMenu = useGameMenu()
const isMounted = useMounted()
const isOnMobile = useMobileBreakpoint('md')
const { setMobile } = useGameInterface()

watch(isOnMobile, (mobile) => setMobile(mobile), { immediate: true })
setupTileListeners()

const { x, y } = useMouse()

const values = computed(() => {

  const xPos = x.value - 10
  const yPos = y.value - 70

  return {
    top: `${yPos}px`,
    left: `${xPos}px`
  }
})



</script>