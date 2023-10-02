<template lang="pug">
VList(w="full" h="full")
  video(:src="videoURL" w="full" h="full" autoplay loop playsinline muted @play="onPlay" @canplay="onPlay" opacity="0 on-loaded:100" transition="all duration-500" :loaded="isLoaded" ref="videoElement" object="cover center on-contain:contain" :contain="fill == 'contain'" v-if="videoURL")

  Transition(name="fade")
    HelperLoader(pos="absolute bottom-3 left-3" v-if="!isLoaded" w="3")

</template>

<script lang="ts" setup>
import { useElementVisibility } from '@vueuse/core'
import type { AnyToken } from '~/composables/Token/useTokens';

const isLoaded = ref(false)
const videoElement = ref()
const config = useRuntimeConfig().public
const { addCacheKey } = useCacheKey()
const onPlay = () => {
  isLoaded.value = true
}

const { token } = defineProps<{
  token: AnyToken,
  fill?: 'cover' | 'contain'
}>()

const visible = useElementVisibility(videoElement)
const externalURL = computed(() => {
  if (isIXToken(token))
    return token.video

  return token.media?.mcVideo
})

const videoPath = computed(() => {
  if (isIXToken(token) || !token.tokenInfo)
    return

  const { tier, type } = token.tokenInfo
  const tierId = tier ? `${tier}` : `${type}`
  return `/nft/video/${type}/${tierId}.mp4`
})

const videoURL = computed(() => {
  if (externalURL.value)
    return externalURL.value

  const path = videoPath.value

  if (path)
    return config.s3 + addCacheKey(path)

  return null
})

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
}, { immediate: true })

</script>
