<template lang="pug">
img(:src="imageSrc" w="full" h="full" object="contain center" v-if="imageSrc" )
</template>

<script lang="ts" setup>
import type { AnyToken } from '@ix/base/composables/Token/useTokens';
const { getTokenImageURL } = useTokenMedia()

const { token, isLarge } = defineProps<{
  token: AnyToken,
  isThumbnail?: boolean,
  isLarge?: boolean,
  isVector?: boolean,
}>()

const imageSrc = await getTokenImageURL(token, isLarge)
</script>
