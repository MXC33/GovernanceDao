<template lang="pug">
div(grid="~ cols-1 md:cols-2 gap-3")
  div(corners="~ accent")
    div(pos="relative" h="full" w="full" pointer-events="none")
      TokenSlideshow(:tokens="block.slideShowItems" h="100")

  InfoStatusBox()
    template(#header v-if="block.title") {{ block.title }}
    template(#header v-else) 
      TokenName(:token="token")


    template(#default)
      VList(space-y="4")
        div(grid="~ cols-2 gap-2")
          template(v-for="item in block.items") 
            InfoBlockItem(:item="item", :token="token")

        InfoBlockButton(:block="block.button" :token="token")
  
</template>

<script lang="ts" setup>
import type { InfoBlockSlideshowHeader } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const props = defineProps<{
  block: InfoBlockSlideshowHeader,
  token: NftFragment
}>()

</script>