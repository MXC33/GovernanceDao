<template lang="pug">
video(:src="videoURL" w="full" autoplay loop playsinline muted)
</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/useTokens';

const { addCacheKey } = useCacheKey()
const props = defineProps<{
  token: TokenIdentifier,
}>()

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