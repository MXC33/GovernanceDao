<template lang="pug">
VList(w="full" h="full")

  video(:src="videoURL" w="full" h="full" autoplay loop playsinline muted @play="isLoaded = true" opacity="0 on-loaded:100" transition="all duration-500" :loaded="isLoaded" ref="videoElement")

  Transition(name="fade")
    HelperLoader(pos="absolute bottom-3 left-3" v-if="!isLoaded" w="3")

</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/Token/useTokens';
import { useElementVisibility } from '@vueuse/core'

const isLoaded = ref(false)
const videoElement = ref()

const { addCacheKey } = useCacheKey()
const props = defineProps<{
  token: TokenIdentifier,
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


const { execute: fetchTokenInfodata, data } = useTokenInfo(props.token)

await fetchTokenInfodata()

const externalURL = computed(() => data.value?.video)

const videoPath = computed(() => {
  const { tier, type } = props.token
  const tierId = tier ? `${tier}` : `${type}`
  return `/nft/video/${type}/${tierId}.mp4`
})

const videoURL = computed(() => {
  const config = useRuntimeConfig().public
  if (externalURL.value)
    return externalURL.value

  return config.s3 + addCacheKey(videoPath.value)
})

</script>