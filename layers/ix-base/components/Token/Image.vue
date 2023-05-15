<template lang="pug">
TokenImageCore(:src="imageSource" w="full" h="full" object="contain center" v-if="imageURLValid")
</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/Token/useTokens'
// const config = useRuntimeConfig().public

const { addCacheKey } = useCacheKey()

const props = defineProps<{
  token: TokenIdentifier,
  isLarge?: boolean,
  isVector?: boolean,
}>()

const { execute: fetchTokenInfodata, data } = useTokenInfo(props.token)

const imageURLValid = ref(false)

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
  if (externalURL.value)
    return externalURL.value

  return addCacheKey(imagePath.value)
})

watch(imageSource, (src) => {
  if (!process.client)
    return

  imageURLValid.value = false
  const image = new Image();
  image.onload = () => {
    console.log("Got image")
    imageURLValid.value = true
  }
  image.onerror = () => {
    console.log("No image")
  }
  image.src = src
}, { immediate: true })

</script>