<template lang="pug">
div(pos="relative" w="full" h="100vh" ref="container" overflow="hidden" bg="black")
  img(:src="image" object="cover center" w="full" h="full" ref="imageElement" pos="absolute inset-0" :opacity="isActive ? '0' : '100'")
  pre(font="bold" ref="codeElement" bg="black" cursor="default" :opacity="isActive ? '100' : '0'" pos="absolute left-50% top-50%" :text="(isActive && pink) ? 'nibiru-pink' : 'white'" :style="codeStyle" leading="1em" tracking="0.087em") {{ ascii }}
</template>

<script lang="ts" setup>
const { asciiArt, url, brighten, imageWidth, imageHeight } = useAsciiImage()
const imageElement = ref()
const codeElement = ref()
const ascii = computed(() => asciiArt.value?.join(""))
const { offset, columns } = useAsciiImageSettings()
const { sine, start: startLFO, stop: stopLFO } = useLFO()
const container = ref()
const scale = ref(1)
const roundedSize = ref(8)
const BASE_FONT_SIZE = computed(() => 10)

const props = defineProps<{
  image: string
  pink?: boolean,
}>()
onMounted(() => updateAsciiSize())

const { width, height } = useIntersectingElementBounding(imageElement, { windowScroll: false })
const { width: containerWidth, height: containerHeight } = useElementBounding(container)
// Ø@%#x*•+=-:. 
// Nice map + 1.42 in contrast

const isActive = computed(() => 1)

useIntersectionObserver(container, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    updateAsciiSize()
    startLFO()
  }
  else
    stopLFO()
}, { threshold: 0 })

startLFO()

const codeStyle = computed(() => ({
  fontSize: `${roundedSize.value}px`,
  transform: `translate(-50%, -50%) scale(${scale.value}) `,
}))

const updateAsciiSize = () => {
  const zoomValueW = 2 * containerWidth.value / 1500
  const zoomValueH = 2 * containerHeight.value / 800

  const zoom = Math.max(zoomValueH, zoomValueW)
  console.log("WIDTH", zoom, zoomValueH, zoomValueW)
  const preciseFontSize = BASE_FONT_SIZE.value * zoom;
  roundedSize.value = Math.floor(preciseFontSize);
  scale.value = preciseFontSize / roundedSize.value;
}
const LOWER_TRESHOLD = 0.5
const HIGHER_TRESHOLD = 0.85

watch([sine, isActive], (val) => {
  const hoverVal = (isActive.value * (LOWER_TRESHOLD + sine.value * HIGHER_TRESHOLD))
  brighten.value = hoverVal
})
watch([width, height], () => {
  imageWidth.value = width.value
  imageHeight.value = height.value
})
watch([offset, columns, containerWidth, codeElement, container], () => {
  updateAsciiSize()
})
watch(() => props.image, () => {
  url.value = props.image
  console.log("Set url", url.value)
}, { immediate: true })

</script>

<style>
pre {
  font-family: "Courier New", Courier, monospace !important;
  transform-origin: center;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  /* Override default look */
  appearance: none;
  width: 25px;
  /* Set a specific slider handle width */
  height: 25px;
  /* Slider handle height */
  background: #04aa6d;
  /* Green background */
  cursor: pointer;
  /* Cursor on hover */
  border-radius: 50%;
}

.slider::-moz-range-thumb {
  width: 25px;
  /* Set a specific slider handle width */
  height: 25px;
  /* Slider handle height */
  background: #04aa6d;
  /* Green background */
  cursor: pointer;
  /* Cursor on hover */
}

:host {
  display: block;
}

:host([hidden]) {
  display: none;
}
</style>