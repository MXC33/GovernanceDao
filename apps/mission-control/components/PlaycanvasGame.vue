<template lang="pug">
ClientOnly()
  VList(pos="fixed" inset="0" opacity="100 on-paused:0" :paused="isRenderedPaused")
    canvas( pos="absolute" inset="0" transition="all delay-200" @mouseenter="mouseChanged(true)" @mouseleave="mouseChanged(false)" ref="canvas" id="application-canvas" opacity="0 on-loaded:100" :loaded="!isLoading")

    Transition(name="fade")
      HelperLoaderSpinner(w="30" v-if="isLoading" pos="fixed top-50% left-50%" translate-x="-50%" translate-y="-50%")
        div(whitespace="nowrap") Loading game... 

</template>

<script setup lang="ts">
const { throttle } = useHelpers()
const { attachToCanvas, playcanvasApp, setMouseEnabled } = usePlayCanvas()
const { isOnMissionControlPath, setupPlaycanvasListeners, resetMode, isRenderedPaused, activeGameMode } = useGameInterface()
const { width, height } = useWindowSize()
const activePopup = usePopups()
const route = useRoute()
const canvas = ref()
const isLoading = ref(true)
const isAttached = ref(false)

const { isSoundEnabled } = useSoundSettings()
const { gameInterface } = useGameInterface()

watch([isSoundEnabled, gameInterface], ([enabled, game]) => {
  if (!game)
    return

  if (enabled)
    gameInterface.value?.unMuteSound();
  else
    gameInterface.value?.muteSound();

}, { immediate: true })

const mouseChanged = (active: boolean) => {
  setMouseEnabled(active)
}

watch([width, height, activePopup], throttle(([w, h, popup]) => {
  if (popup != null)
    return

  updatePlayCanvasSize()
}, 1000))

const updatePlayCanvasSize = () => {
  playcanvasApp.value?.resizeCanvas(width.value, height.value)
}

setupPlaycanvasListeners()

watch(canvas, (canvasElement) => {
  if (!canvasElement)
    return

  nextTick(() => {
    maybeAttach()
  })
}, { immediate: true })

const onMCPath = computed(() => route.path == MC_ROUTE)

const maybeAttach = () => {
  if (isAttached.value || !onMCPath.value)
    return

  attachToCanvas(canvas.value as HTMLCanvasElement, () =>
    isLoading.value = false
  )
  setMouseEnabled(false)
  isAttached.value = true
}

const MC_ROUTE = "/mission-control"

const setRoute = () => {
  isOnMissionControlPath.value = route.path == MC_ROUTE
}

setRoute()


watch(onMCPath, (onPath) => {
  if (!onPath && activeGameMode.value != null)
    return resetMode()

  setRoute()

  maybeAttach()
})

</script>