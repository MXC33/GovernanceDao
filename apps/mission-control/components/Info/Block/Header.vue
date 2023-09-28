<template lang="pug">
div(grid="~ cols-1 md:cols-2 gap-3")
  div(corners="~ accent")
    TokenImage(:token="token" :is-large="true" min-h="0" :key="getNftTokenKey(token)")

  InfoStatusBox()
    template(#header v-if="block.title") {{ block.title }}
    template(#header v-else-if="token.tier == 'chronos'") {{ $t(`overview.chronosContract`) }}
    template(#header v-else-if="token.tier == 'helios'") {{ $t(`overview.heliosContract`) }}
    template(#header v-else) 
      TokenName(:token="token")

    template(#default)
      VList(space-y="4")
        div(grid="~ cols-2 gap-2")
          template(v-for="item in block.items") 
            InfoBlockItem(:item="item", :token="token")

        InfoBlock(v-if="block.content" v-for="item in block.content" :block="item" :token="token")

  
</template>
  
<script lang="ts" setup>
import type { InfoBlockHeader } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'
const { getNftTokenKey } = useNFTs()

defineProps<{
  block: InfoBlockHeader,
  token: NftFragment,
}>()

</script>