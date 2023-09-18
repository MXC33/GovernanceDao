<template lang="pug">
img(:src="imageSource" w="full" h="full" object="contain center")
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'


const { isLarge, token } = defineProps<{
  token: NftFragment,
  isLarge?: boolean
}>()

const { addCacheKey } = useCacheKey()

const externalURL = computed(() =>
  isLarge ? token.media?.mcImage : token.media?.mcIcon
)

const internalURL = computed(() =>
  isLarge ? token.media?.image : token.media?.alchemy
)

const imagePath = computed(() => {
  const sizePath = isLarge ? 'image' : 'icon'
  const tier = token.tokenInfo?.tier ? `-${token.tokenInfo?.tier}` : ''
  return `/nft/images/${token.tokenInfo?.type}/${sizePath}${tier}.png`
})

const imageSource = computed(() => {
  const config = useRuntimeConfig().public

  if (externalURL.value)
    return externalURL.value

  else if (internalURL.value)
    return internalURL.value



  return config.s3 + addCacheKey(imagePath.value)
})

</script>