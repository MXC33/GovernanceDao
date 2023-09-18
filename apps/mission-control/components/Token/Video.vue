<template lang="pug">
video(:src="videoURL" w="full" autoplay loop playsinline muted)
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'

const { addCacheKey } = useCacheKey()
const props = defineProps<{
  token: NftFragment,
}>()


const externalURL = computed(() => props.token.media?.mcVideo)

const videoPath = computed(() => {
  const { tier, type } = props.token.tokenInfo
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