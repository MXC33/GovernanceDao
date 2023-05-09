<template lang="pug">
img(:src="imageSource" w="full" h="full" object="contain center")
</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/useTokens'

const props = defineProps<{
  token: TokenIdentifier,
  isLarge?: boolean,
  isVector?: boolean,
}>()

const { addCacheKey } = useCacheKey()

const { execute: fetchTokenInfodata, data } = useTokenInfo(props.token)
try {
  await fetchTokenInfodata()
} catch (err) {
  console.log("ERR fetching image data", err)
}

const externalURL = computed(() =>
  props.isLarge ? data.value?.image : data.value?.icon
)

const imagePath = computed(() => {
  const sizePath = props.isLarge ? 'image' : 'icon'
  const tier = props.token.tier ? `-${props.token.tier}` : ''
  return `/nft/images/${props.token.type}/${sizePath}${tier}.png`
})

const imageSource = computed(() => {
  const config = useRuntimeConfig().public

  if (externalURL.value)
    return externalURL.value


  return config.s3 + addCacheKey(imagePath.value)
})

</script>