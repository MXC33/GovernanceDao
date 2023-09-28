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



div(pos="absolute right-0 on-isMobile:top-30 top-40")
  img(:src="adDesktop" w="on-isMobile:50 md:80 lg:90 xl:110" cursor="pointer" @click="onClickAd" :isMobile="isOnMobile" v-if="isMCAdActive")
  CloseIcon(w="5" h="5" cursor="pointer" @click="onClickClose" m="t--10px" pos="absolute top-50% right-3" :isMobile="isOnMobile")

</template>

<script lang="ts" setup>
import adDesktop from '~~/assets/images/ui/ads/ad-territorylottery-join-desktop.png'
import CloseIcon from '~/assets/images/ui/close.svg'

const { useMobileBreakpoint } = useDevice()
const { setupTileListeners } = useTiles()
const { isClaimAndUnstakeOpen } = useClaimAndUnstakeAll()

const gameMenu = useGameMenu()
const isMounted = useMounted()
const isOnMobile = useMobileBreakpoint('md')
const { setMobile } = useGameInterface()
const { isMCAdActive, } = useAds()

watch(isOnMobile, (mobile) => setMobile(mobile), { immediate: true })
setupTileListeners()

const { x, y } = useMouse()

const onClickAd = () => {
  const link = 'https://territorylottery.planetix.com'
  return window.location.href = link
}
const onClickClose = () => {
  isMCAdActive.value = false
}

const values = computed(() => {

  const xPos = x.value - 10
  const yPos = y.value - 70

  return {
    top: `${yPos}px`,
    left: `${xPos}px`
  }
})



</script>