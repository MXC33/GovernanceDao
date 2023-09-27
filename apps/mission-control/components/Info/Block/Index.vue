<template lang="pug">
InfoBlockTabs(:token="token" :block="block" v-if="block.blockType == 'tabs'")
InfoBlockHeader(:token="token" :block="block" v-else-if="block.blockType == 'header'")
InfoBlockSlideshowHeader(:token="token" :block="block" v-else-if="block.blockType == 'slideshowHeader'")
InfoBlockDescription(:token="token" :block="block" v-else-if="block.blockType == 'description'")
InfoBlockDetails(:token="token" :block="block" v-else-if="block.blockType == 'details'")
InfoBlockAttributes(:token="token" :block="block" v-else-if="block.blockType == 'attributes'")
InfoBlockSheet(:token="token" :block="block" v-else-if="block.blockType == 'sheet'")
InfoBlockImage(:token="token" :block="block" v-else-if="block.blockType == 'image'")
InfoBlockTable(:token="token" :block="block" v-else-if="block.blockType == 'table'")
InfoBlockSlideshow(:token="token" :block="block" v-else-if="block.blockType == 'slideshow'")
InfoBlockSectionHeader(:block="block" v-else-if="block.blockType == 'sectionHeader'")

</template>

<script lang="ts" setup>
import type { InfoBlock } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

defineProps<{
  block: InfoBlock,
  token?: NftFragment,
}>()

</script>
