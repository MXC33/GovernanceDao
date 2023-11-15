<template lang="pug">
img(:src="imageURL" w="full" h="full" object="contain center on-cover:cover" :cover="cover" v-if="imageURL")
</template>
  
<script lang="ts" setup>
import type { NftFragment } from '#gql';
import type { IXToken } from '~/composables/Token/useIXToken';
import type { AnyToken } from '~/composables/Token/useTokens';
const config = useRuntimeConfig().public

const { isLarge, token } = defineProps<{
  token: AnyToken,
  isLarge?: boolean,
  cover?: boolean
}>()

const { addCacheKey } = useCacheKey()

const imageURL = computed(() => {
  if (isIXToken(token))
    return getIXImage(token)
  return getMCImage(token)
})

const getIXImage = (token: IXToken) => {
  const { icon, thumbnail, image } = token
  const missingURL = (url?: string) =>
    !url || url == ""
  const largeSize = 800
  const transformedLarge = thumbnail.replace("thumbnailv2", `w_${largeSize}/convert-png`)

  if (isLarge && !missingURL(transformedLarge))
    return transformedLarge
  if (!missingURL(icon) && !icon.includes("https://ipfs.io"))
    return icon
  if (!missingURL(thumbnail))
    return thumbnail
  return image
}

const getMCImage = (token: NftFragment) => {
  const externalURL = isLarge ? token.media?.mcImage : token.media?.mcIcon
  const internalURL = isLarge ? token.media?.image : token.media?.alchemy

  if (externalURL)
    return externalURL

  else if (internalURL)
    return internalURL

  return config.s3 + addCacheKey(getLocalPath(token))
}

const getLocalPath = (token: NftFragment) => {
  const sizePath = isLarge ? 'image' : 'icon'
  const tier = token.tokenInfo?.tier ? `-${token.tokenInfo?.tier}` : ''
  return `/nft/images/${token.tokenInfo?.type}/${sizePath}${tier}.png`
}

</script>