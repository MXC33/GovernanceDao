<template lang="pug">
VList(w="full" h="full")

  video(:src="videoURL" w="full" h="full" autoplay loop playsinline muted @play="isLoaded = true" opacity="0 on-loaded:100" transition="all duration-500" :loaded="isLoaded" ref="videoElement")

  Transition(name="fade")
    HelperLoader(pos="absolute bottom-3 left-3" v-if="!isLoaded" w="3")

</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '@ix/base/composables/Token/useTokens';
import { useElementVisibility } from '@vueuse/core'
import type {IXToken} from "~/composables/useCollection";

const isLoaded = ref(false)
const videoElement = ref()
const config = useRuntimeConfig().public

const { addCacheKey } = useCacheKey()
const props = defineProps<{
  token: IXToken,
}>()

const visible = useElementVisibility(videoElement)

const stopVideo = () => {
  if (!videoElement.value)
    return

  videoElement.value.pause()
}

const playVideo = () => {
  if (!videoElement.value)
    return

  if (videoElement.value.currentTime == 0)
    return

  videoElement.value.currentTime = 0
  videoElement.value.play()
}

watch(visible, (isVisible) => {
  if (!isVisible)
    return stopVideo()

  return playVideo()
})


const videoURL = computed(() => {
  if (props.token.video)
    return props.token.video
})

</script>
