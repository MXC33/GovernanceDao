<template lang="pug">
div(w="full" h="full" ref="renderSize")
  canvas.canvas-render(ref="canvas" :width="width" :height="height")
</template>


<script lang="ts" setup>

import { Renderer } from 'interactive-shader-format'
import FragmentShader from "~/assets/shader/stars.fs?raw"
import polychrome from "polychrome"
import type { NftFragment } from '#gql'


const renderSize = ref()
const renderer = ref()
const canvas = ref()
const pos = ref(0)
const fade = ref(0)
const isRendering = ref(false)
const hasMounted = ref(false)
const { width, height } = useElementBounding(renderSize)
// const { x, y } = useMouse()

const props = defineProps<{
  speed: number,
  token: NftFragment,
}>()

const draw = () => {
  if (!renderer.value || !canvas.value)
    return isRendering.value = false

  // const distX = Math.abs(width.value / 2 - x.value) / (width.value / 2)
  // const distY = Math.abs(height.value / 2 - y.value) / (height.value / 2)
  // const dist = (distX + distY) / 2

  renderer.value.draw(canvas.value)

  pos.value = pos.value + ((1 / 60) * 0.05) * (props.speed * 1)
  renderer.value.setValue("zoom", pos.value);

  window.requestAnimationFrame(draw)
}

watch(() => props.speed, (speed) => {
  fade.value = 0.4 - (speed * 0.2)

  renderer.value.setValue("fade", 0.50 + fade.value);
})

const typeColor = computed(() => {

  const DEFAULT_COLOR = "rgb(255, 102, 71, 1)"

  switch (props.token.type) {
    case 'cargo-drop': {
      switch (props.token.tier) {
        case '2':
          return DEFAULT_COLOR
        default:
          return "#00EF91"
      }
    }
    case 'gg': {
      switch (props.token.tier) {
        case 'large':
          return "#00EF91"
        default:
          return DEFAULT_COLOR
      }
    }
    case 'loot-crate': return "rgb(40, 220, 166, 1)"
    case 'starter-pack': return "rgb(255, 255, 255, 1)"
    case 'anniversary-pack':
      switch (props.token.tier) {
        case 'mystery': return "rgba(255, 171, 0, 1)"
        case 'outlier': return "rgb(40, 220, 166, 1)"
        case 'common': return "rgb(120, 194, 131, 1)"
        case 'uncommon': return "rgb(100, 153, 198, 1)"
        case 'rare': return "rgb(167, 136, 201, 1)"
        case 'legendary': return "rgb(215, 184, 132, 1)"
      }
  }
  return DEFAULT_COLOR
})

watch(canvas, (element) => {
  if (hasMounted.value && isRendering.value == false && element)
    draw()
})

onMounted(() => {
  const color = polychrome(typeColor.value)

  const gl = canvas.value.getContext("webgl")
  renderer.value = new Renderer(gl);
  renderer.value.loadSource(FragmentShader)
  renderer.value.setValue("fade", 0.8);
  renderer.value.setValue('color', [(color.r / 255), (color.g / 255), (color.b / 255), 1])
  isRendering.value = true
  draw()
  hasMounted.value = true
})

</script>
<style>
.canvas-render {
  width: 100%;
  height: 100%;
}
</style>