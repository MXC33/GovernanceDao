<template lang="pug">
img(:src="imageSrc" w="full" h="full" object="contain center" v-if="imageSrc" )
</template>

<script lang="ts" setup>
import type { AnyToken } from '@ix/base/composables/Token/useTokens';
const { getTokenImageURL } = useTokenMedia()

const props = defineProps<{
  token: AnyToken,
  isLarge?: boolean,
  isVector?: boolean,
}>()

const imageSrc = await getTokenImageURL(props.token, props.isLarge)
const imageURLValid = ref(false)
// const loadImage = () => {
//   if (!process.client)
//     return

//   imageURLValid.value = false
//   const image = new Image()

//   image.onload = () => {
//     imageURLValid.value = true
//   }
//   image.onerror = () => {
//     console.log("No image")
//   }
//   image.src = imageSrc
// }

// loadImage()

</script>
