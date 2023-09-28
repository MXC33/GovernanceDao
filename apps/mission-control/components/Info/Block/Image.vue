<template lang="pug">
div(corners="~ accent" aspect="2/1" min-h="0")
  img(:src="config?.s3 + '/media/' + block.imageAsset" v-if="block.imageAsset" w="full" h="full" object="cover")

  TokenImage(:token="token" :is-large="true" min-h="0" :key="getNftTokenKey(block.imageToken ?? token)" v-else)
  
</template>
  
<script lang="ts" setup>
import type { InfoBlockImage } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'
const { getNftTokenKey } = useNFTs()
const { public: config } = useRuntimeConfig()

defineProps<{
  block: InfoBlockImage,
  token: NftFragment,
}>()

</script>